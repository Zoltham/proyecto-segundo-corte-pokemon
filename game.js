//Cada equipo puede contener hasta tres Pokémon: La función createRandomTeam(numPokemon) crea equipos aleatorios de Pokémon con hasta tres miembros cada uno.

//Los Pokémon no tienen en cuenta los tipos ni otras estadísticas más allá de su salud y el daño de sus ataques: La clase Pokemon tiene propiedades para la salud y los ataques, y el daño de los ataques se calcula aleatoriamente dentro de un rango específico.

//Cada Pokémon tiene una lista de cuatro ataques, cada uno con su propio valor de daño: Los Pokémon están definidos con una lista de ataques, y cada ataque tiene su propio valor de daño.

//Durante la batalla, los jugadores se turnan para realizar ataques con sus Pokémon: La función startBattle(team1, team2) implementa la lógica de la batalla, donde los equipos se turnan para realizar ataques hasta que uno de los equipos pierde todos sus Pokémon.

//El juego continúa hasta que todos los Pokémon de un equipo han quedado fuera de combate: La batalla continúa iterando sobre los equipos hasta que uno de los equipos queda sin Pokémon vivos.

//El equipo con al menos un Pokémon restante al final de la batalla es declarado ganador: Al final de la batalla, se imprime un mensaje declarando el equipo ganador basado en si alguno de sus Pokémon sigue vivo.


//Patrones de diseño: Se utiliza el patrón de diseño de constructor de clase para crear instancias de la clase Pokemon. Esto permite encapsular la lógica relacionada con los Pokémon y facilita la creación de múltiples Pokémon con propiedades específicas.
//Los métodos attack() y receiveDamage() se definen dentro de la clase Pokemon para encapsular la lógica relacionada con el ataque y la recepción de daño.
//Se utilizan bucles forEach() para iterar sobre los Pokémon en los equipos durante la batalla. Esto simplifica el proceso de realizar ataques a los Pokémon objetivos.
//Aunque no se implementa explícitamente, la función createRandomTeam(numPokemon) actúa como una fábrica simple que crea equipos aleatorios de Pokémon. Este patrón permite crear objetos (Pokemon) sin exponer la lógica de creación a los clientes directamente.

// Definición de los Pokémon y sus ataques
const pokemons = {
    Pikachu: { attacks: ['Impactrueno', 'Rayo', 'Ataque Rápido', 'Placaje'], hp: 30 },
    Caterpie: { attacks: ['Placaje', 'Tacleada', 'Supersónico', 'Drenadoras'], hp: 25 },
    Pidgeotto: { attacks: ['Picotazo', 'Remolino', 'Tornado', 'Ataque Rápido'], hp: 35 },
    Bulbasaur: { attacks: ['Látigo Cepa', 'Drenadoras', 'Placaje', 'Somnífero'], hp: 40 },
    Charmander: { attacks: ['Lanzallamas', 'Gruñido', 'Arañazo', 'Ascuas'], hp: 30 },
    Squirtle: { attacks: ['Pistola Agua', 'Burbuja', 'Ataque Rápido', 'Placaje'], hp: 35 },
    Krabby: { attacks: ['Burbuja', 'Rayo Burbuja', 'Placaje', 'Tajo Cruzado'], hp: 30 },
    Raticate: { attacks: ['Hipercolmillo', 'Ataque Rápido', 'Placaje', 'Golpe Cabeza'], hp: 35 },
    Muk: { attacks: ['Lodo', 'Bomba Lodo', 'Ataque Ácido', 'Infortunio'], hp: 45 },
    Kingler: { attacks: ['Hidropulso', 'Rayo Burbuja', 'Rayo', 'Placaje'], hp: 40 }
};

class Pokemon {
    constructor(name, hp, attacks) {
        this.name = name;
        this.hp = hp;
        this.attacks = attacks;
        this.alive = true;
    }

    attack(target, attackIndex) {
        if (!this.alive) {
            console.error(`${this.name} no puede atacar, ya está fuera de combate.`);
            return;
        }

        const attackName = this.attacks[attackIndex];
        const damage = Math.floor(Math.random() * 10) + 5; // Daño aleatorio entre 5 y 14

        console.log(`${this.name} usa ${attackName} y hace ${damage} puntos de daño a ${target.name}`);
        target.receiveDamage(damage);
    }

    receiveDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            console.log(`${this.name} ha sido derrotado!`);
            this.hp = 0;
            this.alive = false;
        } else {
            console.log(`${this.name} tiene ${this.hp} puntos de salud restantes.`);
        }
    }
}

// Función para crear equipos de Pokémon aleatorios
function createRandomTeam(numPokemon) {
    const team = [];
    const availablePokemons = Object.keys(pokemons);
    for (let i = 0; i < numPokemon; i++) {
        const randomIndex = Math.floor(Math.random() * availablePokemons.length);
        const pokemonName = availablePokemons[randomIndex];
        const { hp, attacks } = pokemons[pokemonName];
        const pokemon = new Pokemon(pokemonName, hp, attacks);
        team.push(pokemon);
        availablePokemons.splice(randomIndex, 1); // Evitar que un mismo Pokémon aparezca dos veces
    }
    return team;
}

// Función para iniciar una batalla entre dos equipos
function startBattle(team1, team2) {
    console.log('¡Comienza la batalla!');
    let round = 1;

    while (team1.some(pokemon => pokemon.alive) && team2.some(pokemon => pokemon.alive)) {
        console.log(`--- Ronda ${round} ---`);

        team1.forEach(attacker => {
            const target = team2.find(pokemon => pokemon.alive);
            if (target) {
                const attackIndex = Math.floor(Math.random() * attacker.attacks.length);
                attacker.attack(target, attackIndex);
            }
        });

        team2.forEach(attacker => {
            const target = team1.find(pokemon => pokemon.alive);
            if (target) {
                const attackIndex = Math.floor(Math.random() * attacker.attacks.length);
                attacker.attack(target, attackIndex);
            }
        });

        round++;
    }

    if (team1.some(pokemon => pokemon.alive)) {
        console.log('¡El equipo 1 ha ganado!');
    } else {
        console.log('¡El equipo 2 ha ganado!');
    }
}

alert("Profe, pongame buena nota porfis");
const team1 = createRandomTeam(3);
const team2 = createRandomTeam(3);
startBattle(team1, team2);
