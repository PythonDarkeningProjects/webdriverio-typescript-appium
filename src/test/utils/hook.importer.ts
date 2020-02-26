export class HookImporter {

    // region public functions

    public import(path: string) {
        require(path);
    }

    // end region
}


// singleton
export default new HookImporter();