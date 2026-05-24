import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
    try {
        // 1. Grab query parameters from the URL
        const { region, season } = req.query;

        // 2. Fetch the raw data from your model functions
        const regions = await getListOfRegions();
        const seasons = await getListOfSeasons();
        let routes = await getAllRoutes();

        // 3. Apply region filtering if present in query parameters
        if (region && region !== '') {
            routes = routes.filter(r => r.region.toLowerCase() === region.toLowerCase());
        }

        // 4. Apply season filtering (matching 'bestSeason' configuration from your model)
        if (season && season !== '') {
            routes = routes.filter(r => r.bestSeason.toLowerCase() === season.toLowerCase());
        }

        // 5. Render your template, passing the filtered routes AND the selected values
        res.render('routes/list', { 
            title: 'Scenic Train Routes',
            regions,
            routes,
            seasons,
            selectedRegion: region || '',
            selectedSeason: season || ''
        });

    } catch (error) {
        console.error("Error filtering routes:", error);
        res.status(500).render('errors/500');
    }
};