const Zootopia = [
    {name: 'Nick', gender: 1, species: 'Fox'},
    {name: 'Judy', gender: 0, species: 'Bunny'}
]
for (const {name, species} of Zootopia) {
    console.log(`Hi, I am ${name}, and I am a ${species}`);
}

//	箭头函数
const arr = [3, 9, 1];
const squares = arr.map(x => x * x);
const names = ['Will', 'Jack', 'Peter', 'Steve', 'Jone', 'Hugo', 'Mike'];
const newSet = names
    .map((name, index) => ({
        id: index,
        name: name
    }))
    .filter(man => man.id % 2 === 0)
    .map(man => [man.name])
    .reduce((a, b) => a.concat(b))
console.log(newSet);


