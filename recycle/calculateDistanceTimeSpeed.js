
export async function calculateDistanceTimeSpeed(locationOne, locationTwo, speed) {
    return new Promise((resolve, reject) => {
        const map = L.map(document.createElement('div')).setView([20.5937, 78.9629], 5);

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(locationOne[0], locationOne[1]),
                L.latLng(locationTwo[0], locationTwo[1])
            ],
            createMarker: () => null,
            routeWhileDragging: false,
            addWaypoints: false,
            fitSelectedRoutes: false,
            show: false
        }).addTo(map);

        routingControl.on('routesfound', function (e) {
            const routes = e.routes;
            const summary = routes[0].summary;
            const distanceKm = summary.totalDistance / 1000;
            const timeHr = distanceKm / speed;

            let distance, time;
            if (distanceKm < 1) {
                distance = (summary.totalDistance).toFixed(0) + 'm';
            } else {
                const km = Math.floor(distanceKm);
                const meters = ((distanceKm - km) * 1000).toFixed(0);
                distance = `${km}km ${meters}m`;
            }

            if (timeHr < 1) {
                time = (timeHr * 60).toFixed(0) + 'min';
            } else {
                const hours = Math.floor(timeHr);
                const minutes = ((timeHr - hours) * 60).toFixed(0);
                time = `${hours}hr ${minutes}min`;
            }

            resolve({
                distance,
                time,
                speed: `${speed}kmph`
            });
        });

        routingControl.on('routingerror', function (err) {
            reject(err);
        });
    });
}
