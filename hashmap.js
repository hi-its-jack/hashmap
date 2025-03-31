export class HashMap {
    constructor(capacity = 16, loadFactor = 0.75) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    set(key, value) {
        const hashCode = this.hash(key);
        const bucket = this.buckets[hashCode];

        if (hashCode < 0 || hashCode >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this.size++;

        if (this.size / this.capacity >= this.loadFactor) {
            this.resize();
        }
    }

    get(key) {
        const hashCode = this.hash(key);
        const bucket = this.buckets[hashCode];

        if (hashCode < 0 || hashCode >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return null;
    }

    has(key) {
        const hashCode = this.hash(key);
        const bucket = this.buckets[hashCode];

        if (hashCode < 0 || hashCode >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        const hashCode = this.hash(key);
        const bucket = this.buckets[hashCode];

        if (hashCode < 0 || hashCode >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    keys() {
        const keys = [];
        for (let bucket of this.buckets) {
            for (let [key, _] of bucket) {
                keys.push(key);
            }
        }
        return keys;
    }

    values() {
        const values = [];
        for (let bucket of this.buckets) {
            for (let [_, value] of bucket) {
                values.push(value);
            }
        }
        return values;
    }

    entries() {
        const entries = [];
        for (let bucket of this.buckets) {
            for (let entry of bucket) {
                entries.push(entry);
            }
        }
        return entries;
    }

    resize() {
        const newCapacity = this.capacity * 2;
        const newBuckets = new Array(newCapacity).fill(null).map(() => []);

        for (let bucket of this.buckets) {
            for (let [key, value] of bucket) {
                const hashCode = this.hash(key);
                newBuckets[hashCode].push([key, value]);
            }
        }

        this.buckets = newBuckets;
        this.capacity = newCapacity;
    }
}


export class HashSet {
    constructor(capacity = 16, loadFactor = 0.75) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    add(key) {
        const hashCode = this.hash(key);
        const bucket = this.buckets[hashCode];

        if (hashCode < 0 || hashCode >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i] === key) {
                return; // If the key already exists, do nothing
            }
        }

        bucket.push(key);
        this.size++;

        if (this.size / this.capacity >= this.loadFactor) {
            this.resize();
        }
    }

    contains(key) {
        const hashCode = this.hash(key);
        const bucket = this.buckets[hashCode];

        if (hashCode < 0 || hashCode >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i] === key) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        const hashCode = this.hash(key);
        const bucket = this.buckets[hashCode];

        if (hashCode < 0 || hashCode >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    values() {
        const keys = [];
        for (let bucket of this.buckets) {
            for (let key of bucket) {
                keys.push(key);
            }
        }
        return keys;
    }

    resize() {
        const newCapacity = this.capacity * 2;
        const newBuckets = new Array(newCapacity).fill(null).map(() => []);

        for (let bucket of this.buckets) {
            for (let key of bucket) {
                const hashCode = this.hash(key);
                newBuckets[hashCode].push(key);
            }
        }

        this.buckets = newBuckets;
        this.capacity = newCapacity;
    }
}