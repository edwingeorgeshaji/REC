import { profile } from '../content/profile.mjs';
import { escape } from './layout.mjs';
// Intentionally illustrative placeholders, never fabricated certificate scans.
const frame=(content)=>`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" rx="12" fill="#dfe7d6"/><rect x="20" y="20" width="560" height="360" rx="4" fill="none" stroke="#9eaf98"/>${content}</svg>`;
const lines=(text,max=30)=>{const result=[];for(const word of text.split(' ')){if(!result.length||result.at(-1).length+word.length>max)result.push(word);else result[result.length-1]+=' '+word;}return result;};
export function placeholderAssets(){return [
 ...profile.certificates.filter(c=>c.published).map((c,i)=>({name:`certificate-${i}.svg`,supplied:!!c.image,content:frame(`<g stroke="#536b53" fill="none" opacity=".5"><circle cx="300" cy="100" r="31"/><path d="M278 123l-10 35 32-15 31 15-10-35"/><path d="m300 81 5 12 13 1-10 9 3 13-11-7-11 7 3-13-10-9 13-1Z"/></g><g text-anchor="middle" fill="#2c4633" font-family="Georgia,serif" font-size="25">${lines(c.title).map((l,j)=>`<text x="300" y="${205+j*34}">${escape(l)}</text>`).join('')}</g><text x="300" y="323" text-anchor="middle" fill="#536b53" font-family="Arial,sans-serif" font-size="11" letter-spacing="3">CERTIFICATE IMAGE PLACEHOLDER</text><path d="M245 345h110" stroke="#9eaf98"/>`)})),
];}
