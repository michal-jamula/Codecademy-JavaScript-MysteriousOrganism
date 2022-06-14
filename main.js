//Question 2
//Returns random DNA letter
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

//Question 2
//Returns array containing random DNA strand
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//Question 3
//Returns an object containing a unique number and DNA array
const pAequorFactory = (uniqueNumber, basesArray) => {
  return {
    specimenNum: uniqueNumber,
    dna: basesArray,

    //Question 4
    //Mutates a single strand of DNA
    mutate() {
      const dnaBases = ["A", "T", "C", "G"];
      let indexToChange = Math.floor(Math.random() * 15);
      let dnaToChange = this.dna[indexToChange];

      /* comment debug code
      console.log(`dnaBases = ${dnaBases}`)
      console.log(`indexToChange@ ${indexToChange}`)
      console.log(`Dna to change: ${dnaToChange}`)
      */
      dnaBases.splice(dnaBases.indexOf(dnaToChange), 1);
      //console.log(`dnaBases after change  = ${dnaBases}`)
      this.dna[indexToChange] = dnaBases[Math.floor(Math.random() * 3)];
    },


    //Question 5
    //Compares DNA with another class
    compareDNA(pAequor) {
      let sameElements = 0;
      let differentElements = 0;

      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) sameElements++;
        else differentElements++;
      }

      //comment code for debug
      //console.log(`Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${Math.round(sameElements/(differentElements + sameElements)*100 * 10) / 10}% DNA in common`)
      
      return (
        Math.round(
          (sameElements / (differentElements + sameElements)) * 100 * 10
        ) / 10
      );
    },

    //Question 6
    // Returns true if more than 60% of strands are C or G
    willLikelySurvive() {
      let countCG = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") countCG++;
      }
      if (countCG >= 9) return true;
      else return false;
    },

    //Question 9 part a
    //returns a second DNA strand based on this one
    complementStrand() {
      let complementStrand = [];
      for (let i = 0; i < this.dna.length; i++) {
        switch (this.dna[i]) {
          case "T":
            complementStrand.push("A");
            break;
          case "A":
            complementStrand.push("T");
            break;
          case "C":
            complementStrand.push("G");
            break;
          case "G":
            complementStrand.push("C");
            break;
        }
      }
      return complementStrand;
    },
  };
};


let animal = pAequorFactory(151, mockUpStrand());
let animal2 = pAequorFactory(152, mockUpStrand());

/* random code for debug and testing
console.log(animal);

animal.mutate();
console.log(animal);
console.log("");
console.log("");
console.log("");
animal.compareDNA(animal2);

console.log("");
console.log("");
console.log("");

console.log(animal.willLikelySurvive());
*/


//Question 7
//Creates 30 instances of paequor which are likely to survive
let likelySurviveArray = [];
for (let i = 0; likelySurviveArray.length < 30; i++) {
  let tempObject = pAequorFactory(i, mockUpStrand());
  if (tempObject.willLikelySurvive()) {
    likelySurviveArray.push(tempObject);
  }
}
/*
likelySurviveArray.forEach((object) => {
  console.log(object.willLikelySurvive())
})
*/

//comment for debug
//console.log(`${animal.dna} \n${animal.complementStrand()}`);



//Question 9 part b
let closestMatch = [0, 0, 0];
for (let i = 0; i < likelySurviveArray.length; i++) {
  let tempMatch = likelySurviveArray[i];
  for (let j = i + 1; j < likelySurviveArray.length; j++) {
    if (tempMatch.compareDNA(likelySurviveArray[j]) > closestMatch[2]) {
      closestMatch = [
        tempMatch,
        likelySurviveArray[j],
        tempMatch.compareDNA(likelySurviveArray[j]),
      ];

      //Console log each i iteration for debug
      //console.log(`Closest match: ${closestMatch}`);
    }
  }
}

//Question 9 part b
console.log(
  `Closest match: Specimen ${closestMatch[0].specimenNum} and ${closestMatch[1].specimenNum} have a match of: ${closestMatch[2]}%`
);
