var fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


exports.home = (req, res) => {
    res.send({ "Status": 'Im Here',
                "Method" : 'POST',
                "Body Form" : ['x-www-form-urlencoded'],
                "Post Field" : ['content'],
                "Link" : 'http://192.168.4.146:3009/sanitize'})
}

exports.clean = (req, res) => {
var contents_app = req.body.content
var sanitizer = require('sanitizer');    
var y = sanitizer.unescapeEntities(contents_app);
var w = sanitizer.sanitize(y);

var stringSearcher = require('string-search');
stringSearcher.find(w, '<span')
  .then(function(resultArr) {
    if(resultArr.length>0){
        const dom = new JSDOM(w);
        var x = dom.window.document.querySelector("span").textContent;
        res.send({ message: x })
    }else{
        stringSearcher.find(w, '<div')
        .then(function(resultArr) {
            if(resultArr.length>0){
                const dom = new JSDOM(w);
                var x = dom.window.document.querySelector("div").textContent;
                res.send({ message: x })
            }else{
                stringSearcher.find(w, '<p')
                .then(function(resultArrx) {
                    if(resultArrx.length>0){
                        const dom = new JSDOM(w);
                var x = dom.window.document.querySelector("p").textContent;
                res.send({ message: x })
                    }else{
                        res.send({ message: contents_app })

                    }

                })


            }

        })
    }
  })

//var x = dom.window.document.querySelector("span").textContent;

   

  
  };
