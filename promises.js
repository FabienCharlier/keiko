const fetchFlowers = () => new Promise(resolve => {
	setTimeout(() => {
		console.log('Flowers fetched !');
		resolve('Flowers !')
	}, 1000)
})

const fetchCats = () => new Promise(resolve => {
	setTimeout(() => {
		console.log('Cats fetched !');
		resolve('Cats !')
	}, 2000)
})

const fetchDogs = () => new Promise(resolve => {
	setTimeout(() => {
		console.log('Dogs fetched !');
		resolve('Dogs !')
	}, 3000)
})

const fetch = () => {
	fetchDogs()
    .then(() => fetchCats())
    .then(() => fetchFlowers())
}

const fetch2 = () => {
	fetchDogs().then(() => {
        console.log("dogs over")
        fetchCats().then(() => {
            console.log("cats over")
            fetchFlowers().then(() => {
                console.log("flowers over")
            })
        })
    })
}

const fetch3 = async () => {
    await fetchDogs()
    await fetchCats()
    await fetchFlowers()
}

//fetch()
//fetch2()
fetch3()
