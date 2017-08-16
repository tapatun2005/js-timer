const titles = {
	days: "Days",
	hours: "Hours",
	mins: "Mins",
	secs: "Secs"
}

class Timer {
	constructor(selector, date, time = "", options = {}) {
		this.selector = selector;
		this.date = new Date(`${date} ${time}`).getTime();
		this.options = {
			days: options.days || titles.days,
			hours: options.hours || titles.hours,
			mins: options.mins || titles.mins,
			secs: options.secs || titles.secs,
		}
		this.render();
		this.countdown();
	}
	
	get days(){
		return Math.floor(this.distance / (1000 * 60 * 60 * 24));
	}
	get hours(){
		return Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		
	}
	get mins(){
		return Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60)); 
	}
	get secs(){
		return Math.floor((this.distance % (1000 * 60)) / 1000);
	}

	// Render remplate
	// -----------------------------------
	render(){
		this.selector.innerHTML = `
			<div>
				<div class="days">${this.days}</div>
				<span>${this.options.days}</span>
			</div>
			<div>
				<div class="hours">${this.hours}</div>
				<span>${this.options.hours}</span>
			</div>
			<div>
				<div class="mins">${this.mins}</div>
				<span>${this.options.mins}</span>
			</div>
			<div>
				<div class="secs">${this.secs}</div>
				<span>${this.options.secs}</span>
			</div>
		`
	}

	// Animation
	// ---------------------------------
	countdown(){
		let now = new Date().getTime();
		this.distance = this.date - now;
		this.update();
		if(this.distance > 0 ) {
			setTimeout(()=>{
				requestAnimationFrame(this.countdown.bind(this));
			}, 1000);
		}
	}

	// Update timer
	// --------------------------------------
	update(){
		this.selector.querySelector(".days").innerHTML = this.days;
		this.selector.querySelector(".hours").innerHTML = this.hours;
		this.selector.querySelector(".mins").innerHTML = this.mins;
		this.selector.querySelector(".secs").innerHTML = this.secs;
	}
}


