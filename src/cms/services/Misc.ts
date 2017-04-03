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
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < 30 * 1000) {
         return 'Just Now';   
    }

    else if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}