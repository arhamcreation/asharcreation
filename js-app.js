// User-Agent Parser: Modularized and Refactored Version
class UserAgentParser {
    constructor(userAgent = navigator.userAgent) {
        this.ua = userAgent;
        this.result = {
            browser: this.getBrowser(),
            os: this.getOS(),
            device: this.getDevice(),
            engine: this.getEngine(),
            cpu: this.getCPU(),
        };
    }

    // Get browser details
    getBrowser() {
        const browserPatterns = [
            { name: "Edge", regex: /edge\/([\d.]+)/i },
            { name: "Chrome", regex: /chrome\/([\d.]+)/i },
            { name: "Firefox", regex: /firefox\/([\d.]+)/i },
            { name: "Safari", regex: /version\/([\d.]+).*safari/i },
            { name: "Opera", regex: /(?:opera|opr)\/([\d.]+)/i },
            { name: "Internet Explorer", regex: /(?:msie |trident.*rv:)([\d.]+)/i },
        ];

        return this.matchPattern(browserPatterns, "browser");
    }

    // Get operating system details
    getOS() {
        const osPatterns = [
            { name: "Windows", regex: /windows nt ([\d.]+)/i },
            { name: "MacOS", regex: /mac os x ([\d._]+)/i },
            { name: "iOS", regex: /iphone os ([\d._]+)/i },
            { name: "Android", regex: /android ([\d.]+)/i },
            { name: "Linux", regex: /linux/i },
        ];

        return this.matchPattern(osPatterns, "OS");
    }

    // Get device type
    getDevice() {
        const devicePatterns = [
            { name: "Mobile", regex: /mobile/i },
            { name: "Tablet", regex: /tablet/i },
            { name: "Desktop", regex: /(?:windows|macintosh|linux)/i },
        ];

        return this.matchPattern(devicePatterns, "device");
    }

    // Get rendering engine details
    getEngine() {
        const enginePatterns = [
            { name: "WebKit", regex: /applewebkit\/([\d.]+)/i },
            { name: "Gecko", regex: /gecko\/([\d.]+)/i },
            { name: "Trident", regex: /trident\/([\d.]+)/i },
            { name: "Blink", regex: /chrome\/([\d.]+)/i }, // Blink is part of Chromium
        ];

        return this.matchPattern(enginePatterns, "engine");
    }

    // Get CPU architecture
    getCPU() {
        const cpuPatterns = [
            { name: "ARM", regex: /arm/i },
            { name: "x86", regex: /x86|i686|i386/i },
            { name: "PowerPC", regex: /ppc/i },
        ];

        return this.matchPattern(cpuPatterns, "CPU");
    }

    // Utility to match patterns and extract version
    matchPattern(patterns, type) {
        for (const pattern of patterns) {
            const match = this.ua.match(pattern.regex);
            if (match) {
                return {
                    type,
                    name: pattern.name,
                    version: match[1] || "Unknown",
                };
            }
        }
        return { type, name: "Unknown", version: "Unknown" };
    }

    // Get the final parsed result
    getResult() {
        return this.result;
    }
}

// Usage Example
const parser = new UserAgentParser();
console.log(parser.getResult());
