using DevChallengeService as service from '../../srv/cat-services';

annotate DevChallengeService.Tests with @(UI: {
    SelectionFields : [text],
    LineItem        : [
        {
            $Type            : 'UI.DataField',
            Value            : title,
            ![@UI.Importance]: #High
        },
        {
            $Type: 'UI.DataField',
            Value: description
        },
        {
            $Type: 'UI.DataField',
            Value: createdBy
        },
        {
            $Type: 'UI.DataField',
            Value: createdAt
        }
    ],
    HeaderInfo      : {
        TypeName      : 'Test',
        TypeNamePlural: 'Tests',
        Title         : {
            $Type: 'UI.DataField',
            Value: title
        },
        Description   : {
            $Type: 'UI.DataField',
            Value: description
        }
    },
    Facets          : [{
        $Type : 'UI.ReferenceFacet',
        Label : 'Test Details',
        Target: '@UI.FieldGroup#Main',
    }],

    FieldGroup #Main: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {Value: title},
            {Value: description},
            {Value: createdBy},{Value: createdAt}
        ]

    },
});
