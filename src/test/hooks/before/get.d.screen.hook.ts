import getScreen from '../../../domain/preconditions/getScreen';

before('Get d Screen', async function(){
    await getScreen.dashboardScreen();
});