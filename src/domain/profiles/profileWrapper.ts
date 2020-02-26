class Attributes {
    options: Object;
}

export class ProfileWrapper {

    // region constructors

    constructor(profile: string){
        if(profile === undefined) { throw new Error('no profile was provided!'); }
        this.profile = profile
        this.set();
    }

    // end region

    
    // region attributes

    profile: string;
    attributes: Attributes;

    // end region


    // region private functions

    private set(){

        this.attributes = new Attributes();

        switch(this.profile) {
            case 'profile:iOS':                
                this.attributes.options = Object.assign(
                    {
                        capabilities: require('@helpers/caps').iosCaps
                    },
                    require('@helpers/caps').serverConfig
                );
                this.attributes.options['capabilities']['app'] = require('@helpers/apps').iosApp;
                break;
            case 'profile:Android':
                this.attributes.options = Object.assign(
                    {
                        capabilities: require('@helpers/caps').androidCaps
                    },
                    require('@helpers/caps').serverConfig
                );
                this.attributes.options['capabilities']['app'] = require('@helpers/apps').androidApp;
                break;
            default:
                throw new Error('Invalid profile!');
        }     
    }

    // end region
}