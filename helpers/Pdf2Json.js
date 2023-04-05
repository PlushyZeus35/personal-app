const fs = require('fs');
const pdf = require('pdf-parse');
const PdfReader = {};
/*module.exports = function getTicketInfo(route){
    let dataBuffer = fs.readFileSync(route);
 
    pdf(dataBuffer).then(function(data) {
    
        // number of pages
        console.log(data.numpages);
        // number of rendered pages
        console.log(data.numrender);
        // PDF info
        console.log(data.info);
        // PDF metadata
        console.log(data.metadata); 
        // PDF.js version
        // check https://mozilla.github.io/pdf.js/getting_started/
        console.log(data.version);
        // PDF text
        console.log(data.text); 
            
    });
}*/

PdfReader.getTicketInfo = (async (route) => {
    try{
        let dataBuffer = fs.readFileSync(route);
        const data = await pdf(dataBuffer);
        return data.text;
    }catch(error){
        console.error(error);
        return null;
    }
    
});

module.exports = PdfReader;
