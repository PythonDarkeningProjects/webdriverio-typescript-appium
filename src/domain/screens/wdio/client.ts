import webdriverio = require('webdriverio');
import elementHandler from '../../handlers/elementHandler';
import getScreen from '../../handlers/preconditions/getScreen';
import { ProfileWrapper } from '../../profiles/profileWrapper';

export default class Client {

    // region constructors

    private constructor() { }

    // end region


    // region attributes

    public client: any;

    public static profile: string;
    private profileWrapper: ProfileWrapper;
    private static singleton: Client;

    // end region


    public static getInstance(): Client {
        if (!Client.profile) throw new Error('to get an instance of this, set a profile first!');

        if (!Client.singleton) Client.singleton = new Client();

        return Client.singleton;
    }


    // region public functions

    public async setPropagation() {
        /*  Client Propagation
        *
        * This propagates the client to the modules that require it
        */

        this.profileWrapper = new ProfileWrapper(Client.profile);
        getScreen.profile = Client.profile;

        this.client = await webdriverio.remote(this.profileWrapper.attributes['options']);
        elementHandler.client = this.client;
        getScreen.client = this.client;
    }

    // end region
}