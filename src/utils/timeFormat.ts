export function secondsToMinutes(seconds:number): string{
    const zeroLeft = (n:number) => Math.floor(n).toString().padStart(2,'0')
    const min = zeroLeft(Math.floor(seconds/60)%60)
    const sec = zeroLeft(Math.floor(seconds)%60)


    return `${min}:${sec}`
}

export function secondsToTime(seconds:number):string{
    const zeroLeft = (n:number) => Math.floor(n).toString().padStart(2,'0');
    const hours = zeroLeft(seconds/3600)
    const min = zeroLeft((seconds/60)%60)
    const sec = zeroLeft((seconds%60)%60)

    return `${hours}:${min}:${sec}`
}