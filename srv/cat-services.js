const cds = require("@sap/cds");

class DevChallengeService extends cds.ApplicationService {
    init() {
        const { Tests, Questions } = this.entities('DevChallengeService');
        // console.log(Tests);

        this.on("randomQuestion", async (req) => {
            // const result = await Select.one.from
            console.log(req);
            return "hello";
        })

        this.on("assignQuestionsToTest", "Tests", async (req) => {
            const { questionsCount } = req.data;
            const [Test, IsActiveEntity] = req.params;
            //  if (test.ID === '82bcc76c-b887-4968-ae8a-343f8689f9de'){
            if (questionsCount <= 0) {
                //  return req.error(403, "the minimum number of questions is 1");
                //return req.err
                return req.reject({
                    message: 'You asked for zero Questions.Nothing to do',
                  //  status: 500
                });
                // throw new Error("the minimum number of questions is 1");

                // return req.reject(403);
            } else {
                //  const srv = await cds.connect.to ('DevChallengeService');
                //    const test1 = await srv.read ('GET','/Tests/82bcc76c-b887-4968-ae8a-343f8689f9de')
                const result = await cds.run(req.query);
                if (result !== undefined) {
                    const  unlinkedQuestions = await SELECT.from(Questions).where`test_ID is NULL`.limit(questionsCount).forUpdate();
                    // await UPDATE(Tests, Test.ID).with({
                    // description: `o ${result[0].description}`
                    // });
                    // const currentTest = await SELECT.from(Tests).where(Test);
                    //const temp = await SELECT`description`.from(Tests);
                    try {
                       if (unlinkedQuestions.length === 0) {
                            return req.reject({
                                message: 'No questions left to be assigned. Create new Questions and try again',
                                status: 403
                            });
                        } else {
                            unlinkedQuestions.forEach(async (item) => {
                                await UPDATE(Questions, item.ID).with({
                                    test_ID: Test.ID
                                });
                            })
                        }
                    } catch (e) {
                        return req.error({
                            message: 'update failed'
                        });
                    }

                    const endResult = SELECT.from(Tests, t => {
                        t`.*`, t.questions(q => {
                            q.text
                            q.ID
                        })
                    }).where(Test);
                    //  return endResult;

                    if (unlinkedQuestions.length < questionsCount) {
                        return req.warn({
                            message: `${questionsCount} question(s) successfully added to the test. Add more questions and try again`,
                        });
                    } else {
                        return {
                            message: `${questionsCount} question(s) successfully added to the test`,
                        }
                    }
                }
            }
            //  }
        })
        return super.init();
    }
}

module.exports = { DevChallengeService };