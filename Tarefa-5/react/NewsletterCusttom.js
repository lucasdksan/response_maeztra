import { useEffect, useRef } from "react";
import mailCRM from "@mailCRM/mailCRM_marketing";


function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

async function sendEmailForPartner(email, id){
    const response = await mailCRM.lists.addListMember(id, {
        email_address: email,
        status: "subscribed"
    });

    console.log(
        `Successfully added contact as an audience member. The contact's id is ${
            response.id
        }.`
    );
}

const NewsletterCusttom = ({ VtexNewsletter, listId })=>{
    const refContent = useRef(null);

    useEffect(() => {
        if (refContent.current) {
            const btnSubmit = refContent.current.querySelector('button[type="submit"]');
            const inputEmail = refContent.current.querySelector('#newsletter-input');

            btnSubmit.addEventListener("click", function(){
                const emailValue = inputEmail.value;

                if(emailValue === "" || !emailValue || !validateEmail(emailValue) ) {
                    console.error("e-mail inválido");
                } else {
                    sendEmailForPartner(emailValue, listId);
                }
            });
        }
    }, [refContent]);

    return(
        <div ref={refContent}>
            <VtexNewsletter />
        </div>
    );
}

NewsletterCusttom.schema = {
    title: "Id do parceiro",
    type: "object",
    properties: {
        listId: {
            title: "Id do parceiro mailCRM",
            type: "string",
            default: ""
        }
    }
}

export default NewsletterCusttom;