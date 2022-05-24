const _generatedUIDs = {};

// Generate UUID with collision checking

export function generateUUID() {
    while (true) {
        var uid = ("0000" + ((Math.random() * Math.pow(36, 4)) | 0).toString(36)).slice(-4);
        if (!_generatedUIDs.hasOwnProperty(uid)) {
            _generatedUIDs[uid] = true;
            return uid;
        }
    }
}