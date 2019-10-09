import fontWidths from './fontWidths.json';

const defaultFontFamily = "'Source Sans Pro', Arial, sans-serif";
const defaultFontSize = "12px";

const RNHelper = {
  measureText : (fontFamily, fontSize,  text) => {
    if (text === undefined) text = "undefined";
    if (text === null) text = "null";
    if (text === NaN) text = "NaN";
    if (typeof text !== "string") text = text.toString();
    if (text.length === 0) return 0;

    if (!fontWidths.hasOwnProperty(fontFamily)) fontFamily = defaultFontFamily;
    if (!fontWidths[fontFamily].hasOwnProperty(fontSize)) fontSize = defaultFontSize;

        let w = 0;
       for (var i = 0; i < text.length; i++) {
        const ch = text.charAt(i);
        w += fontWidths[fontFamily][fontSize].lengths[ch]
       }
       console.log(w);
        return w
    }
}
export default RNHelper;




/** GENERATOR FUNCTION
 * 
 * <Canvas id="c"></Canvas>
const series = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCÇDEFGĞHIİJKLMNOÖPQRSŞTUÜVWXYZ[\\]^_`abcdefgğhıijklmnoöpqrsştuüvwxyz{|}~…';
var o = {};
var fontFamily = "'Source Sans Pro', Arial, sans-serif";

o[fontFamily] = {};
for (var fontSize = 8; fontSize <= 36; fontSize++) {
var fontSizeText = fontSize+"px";
var c = document.getElementById('c');
var ctx = c.getContext('2d');
ctx.font = fontSizeText + " " + fontFamily;

o[fontFamily][fontSizeText] = { lengths: {}};

for (var i = 0; i < series.length; i++) {
  const ch = series.charAt(i);
  o[fontFamily][fontSizeText].lengths[ch] = ctx.measureText(ch).width;
}
}

console.log(JSON.stringify(o));
*/