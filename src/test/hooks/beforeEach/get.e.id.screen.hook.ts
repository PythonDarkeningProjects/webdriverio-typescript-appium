import getScreen from '../../../domain/preconditions/getScreen';

beforeEach('Get e Screen', async function () {
    await getScreen.employeeIDScreen();
});