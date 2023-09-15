namespace fullstack_dev_challenge;

using {
    cuid,
    managed
} from '@sap/cds/common';

define aspect Answers:managed {
    text : String;
}

define entity Questions : cuid {
    text   : String;
    test   : Association to Tests;
    answer : Composition of Answers;
}

define entity Tests : managed, cuid {
    text        : String;
    title       : String;
    description : String;
    questions   : Association to many Questions
                      on questions.test = $self;
}
