export { }

const minX = 138, maxX = 184, minY = -125, maxY = -71
let targetCount = 0

// try many initial x velocity up to maxX (otherwise would overshoot in 1 step)
for (let uX = 1; uX <= maxX; uX++) {

    // try many initial y velocity from minY (any lower would overshoot)
    for (let uY = minY; uY < 1000; uY++) {

        // initial x and y position and if we got into the target zone
        let x = 0
        let y = 0
        let target = false

        // current velocity set to initial velocity
        let vX = uX
        let vY = uY

        // while x and y position have not overshot
        while (x < maxX && y > minY) {

            // increase position by current velocities
            x += vX
            y += vY

            // decrease velocities after time-step (unless vX is already zero)
            if (vX !== 0) {
                vX--
            }
            vY--

            // track if we land in the target zone
            if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
                target = true
            }
        }
        // if we got into the target zone add to count of trajectories that got us there
        if (target) {
            targetCount++
        }
    }
}

console.log(targetCount)