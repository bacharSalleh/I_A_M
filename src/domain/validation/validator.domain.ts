import { Rule } from "./rule.domain";



class Validator {


    public validate(rules: Rule[]){
        rules.forEach((rule:Rule) => {
            rule.apply();
        });
        return true;
    }
}

export default Validator;