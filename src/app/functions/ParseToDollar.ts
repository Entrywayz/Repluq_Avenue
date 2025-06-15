export default function ParseToDollar(str: string): string {
    if(str.includes('$')) return str
    return str + '$'
}