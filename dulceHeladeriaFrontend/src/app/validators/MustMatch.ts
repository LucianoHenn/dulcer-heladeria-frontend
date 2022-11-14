import { AbstractControl } from "@angular/forms";

export function MustMatch(password: string, confirm:string){
    return function(form:AbstractControl){
        const pass = form.get(password)?.value; 
        const confirmPass = form.get(confirm)?.value; 

        if(pass == confirmPass){
            return null; 
        }
        return {contraseñaDiferente: true}
    }
}