import numeral from "numeral";


export const numberFormat =(n:any)=>{
    return numeral(n).format('0,0')
}