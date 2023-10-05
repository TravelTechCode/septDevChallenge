using fullstack_dev_challenge as dc from '../db/data-model';

annotate dc.Tests with {
    title @title:'Title';
    description @title:'Description';
    createdBy @title: 'Created By';
    createdAt @title:'Created At';
};

annotate dc.Questions with {
    text @title: 'Question Text'
};

annotate dc.Answers with {
    text @title: 'Answer Text'
};

