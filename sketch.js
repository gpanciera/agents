
let walker
let isPlaying = false
let btnStartStop
let btnReSeed
let btnReset
let btnSave

function setup() {
	let c = createCanvas(700, 700)
	colorMode(HSB, 360, 100, 100)
	rectMode(CENTER)
	noStroke()

	// draw background only once so that walker steps "stick"
	background(255, 90, 20)

	walker = new Walker

	btnStartStop = createButton('Start')
	btnStartStop.size(80)
	btnStartStop.position(20, height + 20)
	btnStartStop.mouseClicked(togglePlayFunc)

	btnReSeed = createButton('Re-Seed')
	btnReSeed.size(80)
	btnReSeed.position(120, height + 20)
	btnReSeed.mouseClicked( () => walker.reSeed() )
	// btnReSeed.mouseClicked(walker.reSeed)  // doesn't work for some rsn

	btnReset = createButton('Restart')
	btnReset.size(80)
	btnReset.position(220, height + 20)
	btnReset.mouseClicked( () => resetAll(walker) )

	btnSave = createButton('Save Image')
	btnSave.size(80)
	btnSave.position(320, height + 20)
	btnSave.mouseClicked( () => savePressed(c) )
}

function draw() {
	if(isPlaying) {
		walker.reDraw()
		walker.updatePos()
	}
}

function togglePlayFunc() {
	if(isPlaying) {				// if was already playing
		isPlaying = false
		btnStartStop.html('Start')
	}
	else {								// if was paused
		isPlaying = true
		btnStartStop.html('Pause')
	}
}

/*	Could have passed the Walker class' reset func directly to mouseclicked
		but since global background is being changed, it seemed to not
		to belong inside of class 	 */
function resetAll(w) {
	background(255, 90, 20)
	w.reset()
}

// not sure why but I couldn't get this to add the png extenstion correctly
// without passing the canvas into the function. According to docs, you
// should be able to run saveCanvas without a canvas argument
function savePressed(c) {
	saveCanvas(c, 'post-it pic', 'png');
}

class Walker {
	constructor() {
		// begin center and w a constant velocity
		this.pos = createVector(width/2, height/2)
		this.vel = createVector(0.3, -0.1)
	}
	reset() {
		this.pos = createVector(width/2, height/2)
		this.vel = createVector(0.3, -0.1)
	}
	updatePos() {
		// add random change to acceleration
		let acc = createVector(random(-1, 1), random(-1, 1))
		this.pos.add(this.vel)
		this.vel.add(acc)

		// if boundaries of canvas are reached, reverse velocity direction
		if (this.pos.x > width || this.pos.x < 0)
				this.vel.mult(-1)
				// for "proper" reflection, only reverse the x component:
				// this.vel.x = -(this.vel.x)

		if (this.pos.y > height || this.pos.y <0)
				this.vel.mult(-1)
	}
	reDraw() {
		// add randomness to hue, saturation, and rectangle size
		fill(random(100, 360), random(0,100), 100)
		rect(this.pos.x, this.pos.y, random(0, 20), random(0, 20))
	}
	reSeed() {
		this.pos = createVector(random(0, width), random(0, height))
	}
}


/* 	PERLIN ACCELERATION NOT USED
		this.xoff = 0
		this.yoff = 12
		let perlinX = noise(this.xoff) * 30
		let perlinY = noise(this.yoff) * 30
		rect(this.pos.x, this.pos.y, perlinX, perlinY)
		this.xoff += 100
		this.yoff += 100
*/
