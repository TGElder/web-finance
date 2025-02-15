export function validate(e){
    let value = e.target.value;
    let split = value.split(".");
    
    if (split.length > 2) {
        return value + " contains multiple . separators";
    } else if (split.length === 0) {
    }

    if (split.length === 2) {
        let pence = split[1];
    }

    if (split.length === 1) {

    }

    let pounds = split[0];
    let pence = split[1];
    if(e.target.value.length < 5){
      "Please enter text longer than 5 characters"
  }
}

export function parse(value: string): number[] {
    let split: string[] = value.split(".");

    if (split.length > 2) {
        throw new Error(value + " contains multiple . separators");
    } else if (split.length === 0) {
        return [0, 0];
    }

    if (split.length === 2) {
        let pence: number = parseInt(split[1]);
        if (isNaN(pence)) {
            throw new Error(pence + " is not a valid number");
        } else if (pence < 0) {
            throw new Error(pence + " cannot be negative");
        }
        else if (pence >= 100) {
            23.1

        }
    }



    return [1, 2];
}