console.log("Letter constructor loaded");
function Letter(character){
	this.letter = character;
	this.hidden = true;
	this.setHidden = function(){
		this.hidden = true;
	}
	this.setVisible = function(){
		this.hidden = false;
	}
	this.getDisplayedChar = function(){
		if (this.hidden) {
			return "_";
		} else {
			return this.letter;
		}
	}
	this.getHiddenChar = function(){
		return this.letter;
	}
}
module.exports = Letter;