# Poetaster

Poetaster analyzes any poem (or text) you enter for sentiment and word patterns. It also compares it to some of the greats to see whose poetry it is closest to, using data visualization. It was inspired by David Yang and Nimit Maru's Programming Valentine's Day Poetry, and takes advantage of Affective Norms for English Words (ANEW) and the Natural Language Toolkit (NLTK).

## Installation

1. Clone the repository

	```bash
git clone https://github.com/jrauschenberg/poetry.git
```

2. Install dependencies

	```bash
npm install

## Usage

1. Make sure that you have MongoDB installed correctly and running on your machine.
	```bash
mongod
```

2. Seed the database by running
	```bash
node seed.js
```
Note: the seed only comes with certain poetry. If you want more poetry, you will need to add to the seed file.

3. Run the application by typing
	```bash
npm start
```
and
```bash
gulp build
```
Hereafter, you can make sure gulp is running by simply typing
```bash
gulp
```

4. You should now be able to see the app by typing http://localhost:1337/ into your web browser.

## Examples

### Demo

See a live version of the app [here](https://guarded-plains-82965.herokuapp.com/)

### Screenshots

![Screenshot 1](/screenshot1.png/)

![Screenshot 2](/screenshot2.png/)

## Contributors

Poetaster was inspired by David Yang and Nimit Maru's Programming Valentine's Day Poetry, and takes advantage of Affective Norms for English Words (ANEW) and the Natural Language Toolkit (NLTK).

