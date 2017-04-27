/* eslint-disable */

export default {
  "user": {
    "username": {
      "regExp": "^[a-zA-Z0-9_-]{3,20}$",
      "min": 3,
      "max": 20
    },
    "password": {
      "min": 6
    },
    "description": {
      "max": 500
    }
  },
  "book": {
    "title": {
      "min": 1,
      "max": 60
    },
    "description": {
      "min": 50,
      "max": 200
    },
    "content": {
      "min": 200,
      "max": 2000
    },
    "hashtag": {
      "regExp": "^[A-Za-z0-9ก-๙]+$",
      "min": 1,
      "max": 30
    },
    "hashtagsCount": {
      "max": 10
    }
  },
  "chapter": {
    "title": {
      "min": 1,
      "max": 60
    },
    "content": {
      "min": 200,
      "max": 50000
    }
  },
  "userReview": {
    "content": {
      "min": 1,
      "max": 2000
    }
  },
  "comments": {
    "content": {
      "min": 1,
      "max": 2000
    }
  },
  "replies": {
    "content": {
      "min": 1,
      "max": 2000
    }
  },
  "silverCoin": {
    "registerBonus": 5000,
    "regeneration": {
      "amount": 500,
      "cooldown": 43200000
    },
    "userReviewBonus": 1500
  },
  "notiCountdown": 180000
};
