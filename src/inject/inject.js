// Question click
var questions = document.getElementsByClassName('question-hyperlink');
for (var i = 0; i < questions.length; i++) {
	questions[i].addEventListener('click', function() {
		var href = this.getAttribute('href').toString();
		var question_id = href.split('/')[2];
		var question_link = "https://stackoverflow.com/q/" + question_id;
		chrome.extension.sendMessage({"type": "question_click", "content": question_link, "id": question_id});
	});
}

// Tag click
var tags = document.getElementsByClassName('post-tag');
for (var i = 0; i < tags.length; i++) {
	tags[i].addEventListener('click', function() {
		var tag_link = "https://stackoverflow.com" + this.getAttribute('href').toString();
		chrome.extension.sendMessage({"type": "tag_click", "content": tag_link, "id": ""});
	});
}

// Star Unstar
if (document.getElementsByClassName('question-page')[0]) {
	var star = document.getElementsByClassName('star-off');
	star[0].addEventListener('click', function() {
		var question_id = document.getElementsByClassName('question')[0].getAttribute('data-questionid').toString();
		var question_link = "https://stackoverflow.com/q/" + question_id;
		if (document.getElementsByClassName('star-on')[0]) {
			chrome.extension.sendMessage({"type": "unstar", "content": question_link, "id": question_id});
		} else {
			chrome.extension.sendMessage({"type": "star", "content": question_link, "id": question_id});
		}
	});
}

// Share
if (document.getElementsByClassName('question-page')[0]) {
	var share = document.getElementsByClassName('short-link');
	for (var i = 0; i < share.length; i++) {
		share[i].addEventListener('click', function() {
			var title = this.getAttribute("title").toString();
			if (title.includes("question")) {
				var question_id = this.getAttribute("href").toString().split('/')[2];
				var question_link = "https://stackoverflow.com/q/" + question_id;
				chrome.extension.sendMessage({"type": "share_question", "content": question_link, "id": question_id});
			} else {
				var answer_id = this.getAttribute("href").toString().split('/')[2];
				var answer_link = "https://stackoverflow.com/a/" + answer_id;
				chrome.extension.sendMessage({"type": "share_answer", "content": answer_link, "id": answer_id});
			}
		});
	}
}

// Upvote
if (document.getElementsByClassName('question-page')[0]) {
	var upvote = document.getElementsByClassName('vote-up-off');
	for (var i = 0; i < upvote.length; i++) {
		upvote[i].addEventListener('click', function() {
			var title = this.getAttribute("title").toString();
			if (title.includes("question")) {
				var question_id = document.getElementsByClassName('question')[0].getAttribute('data-questionid').toString();
				var question_link = "https://stackoverflow.com/q/" + question_id;
				if (this.getAttribute("class").includes("vote-up-on")) {
					chrome.extension.sendMessage({"type": "upvote_on_question", "content": question_link, "id": question_id});
				} else {
					chrome.extension.sendMessage({"type": "upvote_off_question", "content": question_link, "id": question_id});
				}
			} else {
				var answer_id = this.parentElement.getElementsByTagName('input')[0].getAttribute('value').toString();
				var answer_link = "https://stackoverflow.com/a/" + answer_id;
				if (this.getAttribute("class").includes("vote-up-on")) {
					chrome.extension.sendMessage({"type": "upvote_on_answer", "content": answer_link, "id": answer_id});
				} else {
					chrome.extension.sendMessage({"type": "upvote_off_answer", "content": answer_link, "id": answer_id});
				}
			}
		});
	}
}

// Downvote
if (document.getElementsByClassName('question-page')[0]) {
	var downvote = document.getElementsByClassName('vote-down-off');
	for (var i = 0; i < downvote.length; i++) {
		downvote[i].addEventListener('click', function() {
			var title = this.getAttribute("title").toString();
			if (title.includes("question")) {
				var question_id = document.getElementsByClassName('question')[0].getAttribute('data-questionid').toString();
				var question_link = "https://stackoverflow.com/q/" + question_id;
				if (this.getAttribute("class").includes("vote-down-on")) {
					chrome.extension.sendMessage({"type": "downvote_on_question", "content": question_link, "id": question_id});
				} else {
					chrome.extension.sendMessage({"type": "downvote_off_question", "content": question_link, "id": question_id});
				}
			} else {
				var answer_id = this.parentElement.getElementsByTagName('input')[0].getAttribute('value').toString();
				var answer_link = "https://stackoverflow.com/a/" + answer_id;
				if (this.getAttribute("class").includes("vote-down-on")) {
					chrome.extension.sendMessage({"type": "downvote_on_answer", "content": answer_link, "id": answer_id});
				} else {
					chrome.extension.sendMessage({"type": "downvote_off_answer", "content": answer_link, "id": answer_id});
				}
			}
		});
	}
}

// Scroll
window.addEventListener('scroll', throttle(1500));
function throttle(wait) {
  var time = Date.now();
	var url = document.URL.toString();
  return function() {
    if (url.includes("stackoverflow") && (time + wait - Date.now()) < 0) {
			chrome.extension.sendMessage({"type": "scroll", "content": url, "id": ""});
      time = Date.now();
    }
  }
}
