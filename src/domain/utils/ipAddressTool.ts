import * as os from 'os';

export class IpAddressTool {

    // region Public Methods 

    public getAddress() {
        let interfaces = os.networkInterfaces();
        let name;

        let all = Object.keys(interfaces).map(function (nic) {
            let addresses = interfaces[nic].filter(function (details) {
                if (details.family.toLowerCase() !== 'ipv4') {
                    return false;
                } else if (!name) {
                    return true;
                }

                return name === 'public' ? this.isPrivate(details.address) : this.isPublic(details.address);
            });

            return addresses.length ? addresses[0].address : undefined;
        }).filter(Boolean);

        return all[0];
    }

    // endregion

    // region Helper Methods 

    private isPrivate(addr) {
        return /^(::f{4}:)?10\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) ||
            /^(::f{4}:)?192\.168\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) ||
            /^(::f{4}:)?172\.(1[6-9]|2\d|30|31)\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) ||
            /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) ||
            /^(::f{4}:)?169\.254\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) ||
            /^f[cd][0-9a-f]{2}:/i.test(addr) ||
            /^fe80:/i.test(addr) ||
            /^::1$/.test(addr) ||
            /^::$/.test(addr);
    }

    private isPublic(addr) {
        return !this.isPrivate(addr);
    }

    // endregion

}

export default new IpAddressTool();
