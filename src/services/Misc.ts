// Miscellaneous Helper Functions

// get oauth token from response string
export function getTokenFromString(tokenString: string): string {
  return tokenString.substring(tokenString.indexOf('=') + 1, tokenString.indexOf('&'));
}

// determine if a file is an image 
export function fileIsAnImage(file: string): boolean {
    const regExp = new RegExp(/\.(gif|jpg|jpeg|tiff|png)$/i);
    return regExp.test(file);
}

interface SignedRequest {
    signedRequest: string;
    url: string;
}
// get signed s3 request from server
export function signS3(file: { name: string, type: string }): Promise<SignedRequest> {
    return fetch(`/sign-s3?file-name=${file.name}&file-type=${file.type}`)
        .then(res => res.json())
        .then(<SignedRequest>(res) => {
            return res;
        });
}

// helper for UI time display
export function timeDifference(current, previous) {
    const msPerSecond = 1000;
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current - previous;

    function getDecimalUnit(time, unit) {
        return (time > 1) ? `${unit}s` : unit;
    }

    if (elapsed < 30 * 1000) {
        return 'Just Now';   
    } else if (elapsed < msPerMinute) {
        const unit = getDecimalUnit(Math.round(elapsed/msPerSecond), 'second');
        return `${Math.round(elapsed/msPerSecond)} ${unit} ago`;   
    } else if (elapsed < msPerHour) {
        const unit = getDecimalUnit(Math.round(elapsed/msPerMinute), 'minute');
        return `${Math.round(elapsed/msPerMinute)} ${unit} ago`;   
    } else if (elapsed < msPerDay ) {
        const unit = getDecimalUnit(Math.round(elapsed/msPerHour), 'hour');
        return `${Math.round(elapsed/msPerHour)} ${unit} ago`;   
    } else if (elapsed < msPerMonth) {
        const unit = getDecimalUnit(Math.round(elapsed/msPerDay), 'day');
        return `${Math.round(elapsed/msPerDay)} ${unit} ago`;   
    } else if (elapsed < msPerYear) {
        const unit = getDecimalUnit(Math.round(elapsed/msPerMonth), 'month');
        return `${Math.round(elapsed/msPerMonth)} ${unit} ago`;
    } else {
        const unit = getDecimalUnit(Math.round(elapsed/msPerYear), 'year');
        return `${Math.round(elapsed/msPerYear)} ${unit} ago`;   
    }
}