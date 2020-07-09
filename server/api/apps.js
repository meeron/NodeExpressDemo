import appsService from '../services/apps.js';

async function createApp() {
    return await appsService.create();
}

export default function() {
    return [
        { path: '/apps', method: 'post', handler: createApp },
    ];
};
