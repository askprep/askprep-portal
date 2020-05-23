var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

//create express app
const app = express();
app.use(cors());

app.use(express.static('uploads'));

// parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
// parse requests of content-type - application/json
app.use(bodyParser.json());

var ocrJson = {
    "content": {
        "blocks": [{
                "key": "1",
                "text": "Important note :—",
                "type": "unstyled",
                "depth": 0,
                "inlineStyleRanges": [],
                "entityRanges": [],
                "data": {}
            },
            {
                "key": "2",
                "text": "\nCandidates are to answer‘all parts and sub parts of aquestion being attempted contiguously on the answer-book. In other words, all parts and sub parts ofaquestion being attempted are to be completed beforeattempting the next question on the answer. book.",
                "type": "unstyled",
                "depth": 0,
                "inlineStyleRanges": [],
                "entityRanges": [],
                "data": {}
            },
            {
                "key": "3",
                "text": "\nPages left blank in the answer-book, if any, are to bestruck out. Answers that follow blank pages may notbe given credit.",
                "type": "unstyled",
                "depth": 0,
                "inlineStyleRanges": [],
                "entityRanges": [],
                "data": {}
            },
            {
                "key": "4",
                "text": "\n ",
                "type": "unstyled",
                "depth": 0,
                "inlineStyleRanges": [],
                "entityRanges": [],
                "data": {}
            },
            {
                "key": "5",
                "text": "\n1. (a) A salient pole alternator has X, = 1-4, xX, =1-0and r, = 0. If this alternator delivers rated KVAat unity pf and at rated voltage, find its powerangle and excitation ‘voltage. :\n(b) What are the. objectives of ‘optimal schedulingof hydro-thermal units’ ?(c) Answer the following with respect to the circuit",
                "type": "unstyled",
                "depth": 0,
                "inlineStyleRanges": [],
                "entityRanges": [],
                "data": {}
            },
            {
                "key": "6",
                "text": "\n ",
                "type": "unstyled",
                "depth": 0,
                "inlineStyleRanges": [],
                "entityRanges": [],
                "data": {}
            },
            {
                "key": "7",
                "text": "\n ",
                "type": "unstyled",
                "depth": 0,
                "inlineStyleRanges": [],
                "entityRanges": [],
                "data": {}
            },
            {
                "key": "8",
                "text": "\n ",
                "type": "unstyled",
                "depth": 0,
                "inlineStyleRanges": [],
                "entityRanges": [],
                "data": {}
            },
            {
                "key": "9",
                "text": "\n ",
                "type": "unstyled",
                "depth": 0,
                "inlineStyleRanges": [],
                "entityRanges": [],
                "data": {}
            },
            {
                "key": "10",
                "text": "\nshown :Ro—wv* 0I,+¥ y, we = = Ve° o",
                "type": "unstyled",
                "depth": 0,
                "inlineStyleRanges": [],
                "entityRanges": [],
                "data": {}
            },
            {
                "key": "11",
                "text": "\nContd.)",
                "type": "unstyled",
                "depth": 0,
                "inlineStyleRanges": [],
                "entityRanges": [],
                "data": {}
            }
        ],
        "entityMap": {}
    },
    "rectangles": [{
            "type": "text",
            "left": 87,
            "top": 86,
            "width": 225,
            "height": 45
        },
        {
            "type": "text",
            "left": 142,
            "top": 145,
            "width": 612,
            "height": 177
        },
        {
            "type": "text",
            "left": 142,
            "top": 346,
            "width": 612,
            "height": 102
        },
        {
            "type": "text",
            "left": 87,
            "top": 471,
            "width": 667,
            "height": 8
        },
        {
            "type": "text",
            "left": 91,
            "top": 510,
            "width": 662,
            "height": 260
        },
        {
            "type": "text",
            "left": 318,
            "top": 865,
            "width": 376,
            "height": 6
        },
        {
            "type": "text",
            "left": 404,
            "top": 866,
            "width": 4,
            "height": 188
        },
        {
            "type": "text",
            "left": 564,
            "top": 867,
            "width": 4,
            "height": 188
        },
        {
            "type": "text",
            "left": 227,
            "top": 1050,
            "width": 467,
            "height": 5
        },
        {
            "type": "text",
            "left": 189,
            "top": 781,
            "width": 542,
            "height": 281
        },
        {
            "type": "text",
            "left": 676,
            "top": 1149,
            "width": 78,
            "height": 23
        }
    ]
};

// define a simple route
app.post('/rects', (req, res) => {
    // let image_path = req.body["image_path"];
    // ocr.imageToDraftContent(image_path).then(function (content) {
    //     res.json(content);
    // }).catch(err => {
    //     console.error(err);
    //     res.status(500).send({
    //         "error": "Server Error"
    //     });
    // });
    res.json(ocrJson["rectangles"]);
});

// define a simple route
app.post('/ocr', (req, res) => {
    // let image_path = req.body["image_path"];
    // ocr.imageToDraftContent(image_path).then(function (content) {
    //     res.json(content);
    // }).catch(err => {
    //     console.error(err);
    //     res.status(500).send({
    //         "error": "Server Error"
    //     });
    // });
    res.json(ocrJson["content"]);
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});