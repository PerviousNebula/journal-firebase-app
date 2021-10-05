import cloudinary from 'cloudinary';

import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({ 
    cloud_name: 'dtumtquax', 
    api_key: '995589939167867', 
    api_secret: 'Dd2tSbmtoFS3xZcBZ2ReAjnjwbo',
    secure: true
});

describe('Pruebas en fileUpload.js', () => {

    test('debe de cargar un archivo y retornar un url', async () => {
        const resp = await fetch('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-tfs1hLytweDozoNPqfaw9CNEXt_vMrUFtgkqJ2oEcHfGlyoHG7h9JZVMiD_psPsUfDs&usqp=CAU');
        const blob = await resp.blob();
        const file = new File([blob], 'foto.png');

        const url = await fileUpload(file);

        expect(typeof url).toBe('string');

        // Borrar imagen de cloudinary
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');
        await cloudinary.v2.api.delete_resources(imageId, {}, () => {});
    });

    test('debe de retornar un error', async () => {
        const file = new File([], 'foto.png');

        const url = await fileUpload(file);

        expect(url).toBe(null);
    });

});
