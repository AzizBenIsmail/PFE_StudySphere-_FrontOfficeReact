import React from 'react'
import 'react-notifications/lib/notifications.css'
import { GrFormNextLink } from "react-icons/gr";

export default function announcement () {

  return (
    <>
      <div className=" container mx-auto px-1 h-full ">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-9/12 px-1 ">
            <div className="relative flex flex-col min-w-0 break-words w-full  shadow-lg rounded-lg bg-blueGray-800 border-0">
              <div className="rounded-t  px-6 py-6 ">
                <div className="text-center mt-3  ">
                  <h6 className="text-blueGray-400 text-sm  ">
                    Welcome to our platform! We encourage you to complete each step of our form carefully and accurately.
                    Each answer brings you one step closer to your professional goals. Plus, don't forget that every time
                    you reach 1000 points, you unlock a special discount on our training courses. So, immerse yourself
                    in the process and let us guide you towards a bright and successful future! 🚀
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <div className="text-center mt-3 ">
                  <h6 className="text-blueGray-400 text-sm  ">
                    Bienvenue sur notre plateforme ! Nous vous encourageons à remplir chaque étape de notre
                    formulaire avec soin et précision. Chaque réponse vous rapproche un peu plus de vos objectifs
                    professionnels. De plus, n'oubliez pas que chaque fois que vous atteignez 1000 points,
                    vous débloquez une remise spéciale sur nos formations. Alors, plongez-vous dans le processus et
                    laissez-nous vous guider vers un avenir brillant et rempli de réussite ! 🚀
                  </h6>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300 mt-3 " />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0 mt-3  ">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>مرحبا بكم في منصتنا! نحن نشجعك على إكمال كل خطوة من النموذج الخاص بنا بعناية ودقة.
                    كل إجابة تقربك خطوة واحدة من أهدافك المهنية. بالإضافة إلى ذلك، لا تنس أنه في كل مرة تصل فيها إلى 1000 نقطة،
                    يمكنك الحصول على خصم خاص على دوراتنا التدريبية. لذا، انغمس في هذه العملية ودعنا نرشدك نحو مستقبل مشرق وناجح!! 🚀</small>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300 " />
              </div>
              <div className="flex-auto px-3 lg:px-10 py-10 pt-0 flex justify-end"> {/* Ajoutez la classe 'justify-end' pour aligner le contenu à droite */}
                <div >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <img
                    className="ml-3"
                    src={require("../../../assets/img/info.gif").default}
                    alt="..."
                     style={{ maxWidth: '25%', height: '25%' }}
                  />
                  <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                  onClick={event => window.location.replace(`/First/Step`) }
                  >
                    <GrFormNextLink style={{fontSize: '40px'}} />
                  </button>
                  </div>
                  </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
