/**
 * Textes juridiques (mentions légales, politique de confidentialité et de cookies)
 * en français, espagnol et anglais. La version française fait foi.
 * Les valeurs propres à l'entreprise viennent de src/config/site.js.
 *
 * Structure : { title, kicker, updated, sections: [{ id?, h, p?: [...], ul?: [...] }] }
 * ⚠️ À faire relire par la responsable (et idéalement un juriste) avant la mise en ligne,
 * en particulier les durées de conservation et l'identité de l'hébergeur.
 */
import { site } from '../config/site.js';
import { lang } from '../i18n/index.js';

const s = site;
const contact = `${s.email} · ${s.phoneDisplay}`;
const dates = { fr: '16 novembre 2026', es: '16 de noviembre de 2026', en: '16 November 2026' };

const mentions = {
  fr: {
    kicker: 'Informations légales',
    title: 'Mentions légales',
    updated: `Dernière mise à jour : ${dates.fr}`,
    sections: [
      { h: 'Éditrice du site', p: [`${s.name} est une activité indépendante de soins esthétiques et de bien-être à domicile, exercée par ${s.legalName}, esthéticienne diplômée, à ${s.address.locality} (Suisse).`], ul: [`Responsable de la publication : ${s.legalName}`, `E-mail : ${s.email}`, `Téléphone : ${s.phoneDisplay}`, `Lieu d’activité : ${s.address.locality} et communes voisines, soins à domicile sur rendez-vous`] },
      { h: 'Conception et réalisation', p: [`Site conçu et développé par ${s.creator.name} — ${s.creator.label}.`] },
      { h: 'Hébergement', p: [`Le site est hébergé par ${s.host.name} (${s.host.country.fr}). Les données de réservation sont enregistrées sur l’infrastructure Google Firebase (Google Ireland Limited / Google LLC).`] },
      { h: 'Nature des prestations', p: ['Les soins proposés sont des soins esthétiques et de bien-être. Ils ne constituent pas des actes médicaux ou paramédicaux, ne visent pas à diagnostiquer ou traiter une maladie et ne remplacent pas un avis médical. En cas de doute sur une contre-indication (grossesse, trouble circulatoire, affection de la peau, traitement en cours), demandez l’avis de votre médecin avant le soin.'] },
      { h: 'Tarifs et rendez-vous', p: ['Les prix sont indiqués en francs suisses (CHF). Ils peuvent être modifiés en tout temps ; le tarif applicable est celui en vigueur au moment de la confirmation du rendez-vous. Une demande envoyée par le site n’est définitive qu’après confirmation par l’esthéticienne. Les modalités de déplacement sont précisées lors de cette confirmation.'] },
      { h: 'Propriété intellectuelle', p: ['Les textes, photographies, éléments graphiques et la structure du site sont protégés par le droit d’auteur. Toute reproduction ou réutilisation, même partielle, nécessite un accord écrit préalable.'] },
      { h: 'Responsabilité', p: ['Les informations publiées sont établies avec soin, sans garantie d’exhaustivité ni d’actualité permanente. La responsabilité de l’éditrice ne saurait être engagée du fait du contenu de sites tiers vers lesquels des liens renvoient (WhatsApp, Instagram, etc.).'] },
      { h: 'Droit applicable et for', p: [`Le présent site et son utilisation sont soumis au droit suisse. Sous réserve de dispositions légales impératives, le for est à ${s.address.locality}.`] },
    ],
  },
  es: {
    kicker: 'Información legal',
    title: 'Aviso legal',
    updated: `Última actualización: ${dates.es}`,
    sections: [
      { h: 'Titular del sitio', p: [`${s.name} es una actividad independiente de tratamientos de estética y bienestar a domicilio, ejercida por ${s.legalName}, esteticista titulada, en Ginebra (Suiza).`], ul: [`Responsable de la publicación: ${s.legalName}`, `Correo: ${s.email}`, `Teléfono: ${s.phoneDisplay}`, 'Lugar de actividad: Ginebra y municipios vecinos, tratamientos a domicilio con cita previa'] },
      { h: 'Diseño y desarrollo', p: [`Sitio diseñado y desarrollado por ${s.creator.name} — ${s.creator.label}.`] },
      { h: 'Alojamiento', p: [`El sitio está alojado por ${s.host.name} (${s.host.country.es}). Los datos de reserva se guardan en la infraestructura Google Firebase (Google Ireland Limited / Google LLC).`] },
      { h: 'Naturaleza de los servicios', p: ['Los tratamientos ofrecidos son de estética y bienestar. No constituyen actos médicos ni paramédicos, no tienen por objeto diagnosticar ni tratar enfermedades y no sustituyen una consulta médica. Ante cualquier duda sobre una contraindicación (embarazo, problemas circulatorios, afecciones de la piel, tratamiento en curso), consulta a tu médico antes del tratamiento.'] },
      { h: 'Precios y citas', p: ['Los precios se indican en francos suizos (CHF) y pueden modificarse en cualquier momento; se aplica la tarifa vigente al confirmar la cita. Una solicitud enviada desde el sitio solo es definitiva tras la confirmación de la esteticista. Las condiciones de desplazamiento se indican en esa confirmación.'] },
      { h: 'Propiedad intelectual', p: ['Los textos, fotografías, elementos gráficos y la estructura del sitio están protegidos por derechos de autor. Cualquier reproducción o reutilización, incluso parcial, requiere autorización previa por escrito.'] },
      { h: 'Responsabilidad', p: ['La información publicada se elabora con cuidado, sin garantía de exhaustividad ni de actualización permanente. La titular no responde del contenido de sitios de terceros enlazados (WhatsApp, Instagram, etc.).'] },
      { h: 'Derecho aplicable y jurisdicción', p: ['Este sitio y su uso se rigen por el derecho suizo. Salvo disposición legal imperativa, el fuero competente es Ginebra. En caso de divergencia entre versiones, prevalece la versión francesa.'] },
    ],
  },
  en: {
    kicker: 'Legal information',
    title: 'Legal notice',
    updated: `Last updated: ${dates.en}`,
    sections: [
      { h: 'Website publisher', p: [`${s.name} is an independent business providing beauty and wellness treatments at clients' homes, run by ${s.legalName}, qualified beautician, in Geneva (Switzerland).`], ul: [`Person responsible for publication: ${s.legalName}`, `Email: ${s.email}`, `Phone: ${s.phoneDisplay}`, 'Place of business: Geneva and neighbouring towns, home treatments by appointment'] },
      { h: 'Design and development', p: [`Website designed and built by ${s.creator.name} — ${s.creator.label}.`] },
      { h: 'Hosting', p: [`The website is hosted by ${s.host.name} (${s.host.country.en}). Booking data is stored on the Google Firebase infrastructure (Google Ireland Limited / Google LLC).`] },
      { h: 'Nature of the services', p: ['The treatments offered are beauty and wellness treatments. They are not medical or paramedical procedures, are not intended to diagnose or treat any condition and do not replace medical advice. If you are unsure about a contraindication (pregnancy, circulatory problems, skin conditions, ongoing treatment), ask your doctor before the treatment.'] },
      { h: 'Prices and appointments', p: ['Prices are shown in Swiss francs (CHF) and may change at any time; the price in force when the appointment is confirmed applies. A request sent through the website is final only once confirmed by the beautician. Travel arrangements are specified in that confirmation.'] },
      { h: 'Intellectual property', p: ['The text, photographs, graphics and structure of this website are protected by copyright. Any reproduction or reuse, even partial, requires prior written consent.'] },
      { h: 'Liability', p: ['The information published is prepared with care, without any guarantee that it is complete or permanently up to date. The publisher is not liable for the content of third-party websites linked from this site (WhatsApp, Instagram, etc.).'] },
      { h: 'Applicable law and jurisdiction', p: ['This website and its use are governed by Swiss law. Subject to mandatory legal provisions, the place of jurisdiction is Geneva. If versions differ, the French version prevails.'] },
    ],
  },
};

const privacy = {
  fr: {
    kicker: 'Protection des données',
    title: 'Politique de confidentialité',
    updated: `Dernière mise à jour : ${dates.fr}`,
    sections: [
      { h: 'En bref', p: [`${s.name} collecte uniquement les données nécessaires pour organiser vos rendez-vous. Elles ne sont ni vendues ni utilisées à des fins publicitaires. Aucun outil de mesure d’audience n’est activé sans votre accord. La présente politique est établie conformément à la loi fédérale suisse sur la protection des données (LPD, dans sa version en vigueur depuis le 1er septembre 2023, dite « nLPD »).`] },
      { h: 'Responsable du traitement', p: [`${s.legalName}, ${s.name}, ${s.address.locality} (Suisse).`, `Pour toute question ou demande relative à vos données : ${contact}.`] },
      { h: 'Données traitées', p: ['Selon votre utilisation du site, les données suivantes peuvent être traitées :'], ul: ['Demande de rendez-vous : nom et prénom, numéro de téléphone, adresse e-mail (facultative), adresse du soin à domicile, soins choisis, date et heure, message libre, langue du site utilisée.', 'Échanges directs : contenu des messages que vous envoyez par WhatsApp, e-mail ou téléphone.', 'Données techniques : adresse IP, date et heure, type de navigateur, enregistrés dans les journaux de l’hébergeur à des fins de sécurité.', 'Mesure d’audience, uniquement avec votre accord : pages consultées, appareil et provenance approximative, sous forme statistique.'] },
      { h: 'Données sensibles', p: ['Certaines informations utiles au soin (grossesse, allergie, affection de la peau, contre-indication) peuvent constituer des données sensibles relatives à la santé. Ne communiquez que ce qui est nécessaire : en les transmettant, vous consentez expressément à leur utilisation pour adapter le soin. Elles ne sont jamais transmises à des tiers.'] },
      { h: 'Finalités', ul: ['Traiter votre demande, confirmer, modifier ou annuler un rendez-vous et vous contacter à ce sujet.', 'Afficher aux autres visiteurs les créneaux déjà occupés, sans aucune donnée permettant de vous identifier.', 'Assurer le suivi de la clientèle et respecter les obligations légales (comptabilité).', 'Garantir la sécurité et le bon fonctionnement du site.', 'Avec votre accord uniquement : établir des statistiques de fréquentation.'] },
      { h: 'Fondement du traitement', p: ['Les données sont traitées pour préparer et exécuter la prestation que vous demandez, sur la base de votre consentement lorsque celui-ci est requis (données sensibles, mesure d’audience), ou en raison d’un intérêt prépondérant (sécurité du site) ou d’une obligation légale.'] },
      { h: 'Destinataires et sous-traitants', p: ['Vos données sont accessibles uniquement à l’esthéticienne. Elles sont hébergées ou acheminées par les prestataires suivants, qui n’agissent que sur instruction :'], ul: ['Google Firebase (Google Ireland Limited / Google LLC) : enregistrement des demandes de rendez-vous et du planning, envoi technique des e-mails.', 'Google (Gmail) : acheminement des e-mails de confirmation.', 'WhatsApp (Meta Platforms Ireland Limited) : lorsque vous choisissez d’envoyer votre demande par WhatsApp, selon les conditions de ce service.', `${s.host.name} : hébergement des pages du site.`, 'Google Analytics (Google Ireland Limited), uniquement si vous l’acceptez : statistiques de fréquentation.'] },
      { h: 'Communication à l’étranger', p: ['Ces prestataires peuvent traiter des données hors de Suisse, notamment dans l’Union européenne et l’Espace économique européen (niveau de protection reconnu adéquat par la Suisse) ainsi qu’aux États-Unis. Dans ce dernier cas, le transfert repose sur le cadre Suisse–États-Unis de protection des données (Swiss-U.S. Data Privacy Framework) lorsque le prestataire y est certifié, ou à défaut sur des clauses contractuelles types.'] },
      { h: 'Durée de conservation', ul: ['Demandes et rendez-vous : 24 mois après le dernier rendez-vous, puis suppression.', 'Pièces comptables : 10 ans, conformément au droit suisse.', 'Journaux techniques : selon la durée fixée par l’hébergeur.', 'Choix relatif aux cookies : 12 mois sur votre appareil.'] },
      { h: 'Sécurité', p: ['Le site est servi exclusivement en connexion chiffrée (HTTPS). L’accès au planning est protégé par un compte personnel ; des règles d’accès strictes empêchent tout visiteur de consulter les données d’une autre personne. Seul le créneau horaire réservé est visible publiquement. En cas de violation de la sécurité des données présentant un risque élevé, le Préposé fédéral et les personnes concernées seraient informés conformément à la loi.'] },
      { id: 'cookies', h: 'Cookies et technologies similaires', p: ['Le site n’utilise aucun cookie publicitaire et aucun traceur de réseaux sociaux. Lors de votre première visite, un bandeau vous permet d’accepter ou de refuser les éléments facultatifs ; vous pouvez modifier ce choix à tout moment via le lien « Gérer les cookies » en bas de page.'], ul: ['Nécessaires (toujours actifs) : mémorisation de votre choix relatif aux cookies et fonctionnement de la réservation. Ils sont enregistrés dans le stockage local de votre navigateur et ne servent pas à vous suivre.', 'Mesure d’audience (facultatif, désactivé par défaut) : Google Analytics, avec adresse IP abrégée, pour connaître les pages les plus consultées. Cookies « _ga », durée maximale de 13 mois. Ils ne sont déposés qu’après votre acceptation et supprimés si vous retirez votre accord.'] },
      { h: 'Vos droits', p: ['Vous pouvez à tout moment, gratuitement :'], ul: ['demander quelles données vous concernant sont traitées et en obtenir une copie (droit d’accès et de remise) ;', 'faire rectifier des données inexactes ;', 'demander l’effacement de vos données ou vous opposer à leur traitement, dans les limites des obligations légales de conservation ;', 'retirer un consentement donné, sans effet rétroactif.'] },
      { h: 'Exercer vos droits', p: [`Adressez votre demande à ${contact}. Une réponse vous est donnée dans un délai de 30 jours. Vous pouvez également vous adresser au Préposé fédéral à la protection des données et à la transparence (PFPDT), Feldeggweg 1, 3003 Berne — www.edoeb.admin.ch.`] },
      { h: 'Mineurs', p: ['Les demandes de rendez-vous concernant une personne mineure doivent être effectuées par son représentant légal ou avec son accord.'] },
      { h: 'Modifications', p: ['Cette politique peut être adaptée en cas d’évolution du site ou du cadre légal. La version publiée sur cette page fait foi.'] },
    ],
  },
  es: {
    kicker: 'Protección de datos',
    title: 'Política de privacidad',
    updated: `Última actualización: ${dates.es}`,
    sections: [
      { h: 'En resumen', p: [`${s.name} recoge únicamente los datos necesarios para organizar tus citas. No se venden ni se utilizan con fines publicitarios. No se activa ninguna herramienta de medición de audiencia sin tu consentimiento. Esta política se ajusta a la ley federal suiza de protección de datos (LPD, en su versión vigente desde el 1 de septiembre de 2023, conocida como «nLPD»).`] },
      { h: 'Responsable del tratamiento', p: [`${s.legalName}, ${s.name}, Ginebra (Suiza).`, `Para cualquier consulta o solicitud sobre tus datos: ${contact}.`] },
      { h: 'Datos tratados', p: ['Según el uso que hagas del sitio, pueden tratarse los siguientes datos:'], ul: ['Solicitud de cita: nombre y apellidos, teléfono, correo electrónico (opcional), dirección del tratamiento a domicilio, tratamientos elegidos, fecha y hora, mensaje libre e idioma del sitio utilizado.', 'Comunicaciones directas: contenido de los mensajes que envías por WhatsApp, correo o teléfono.', 'Datos técnicos: dirección IP, fecha y hora y tipo de navegador, registrados por el proveedor de alojamiento con fines de seguridad.', 'Medición de audiencia, solo con tu consentimiento: páginas visitadas, dispositivo y procedencia aproximada, en forma estadística.'] },
      { h: 'Datos sensibles', p: ['Cierta información útil para el tratamiento (embarazo, alergias, afecciones de la piel, contraindicaciones) puede considerarse dato sensible relativo a la salud. Comunica solo lo necesario: al facilitarla, consientes expresamente su uso para adaptar el tratamiento. Nunca se transmite a terceros.'] },
      { h: 'Finalidades', ul: ['Tramitar tu solicitud, confirmar, modificar o cancelar una cita y contactarte al respecto.', 'Mostrar a los demás visitantes las horas ya ocupadas, sin ningún dato que permita identificarte.', 'Realizar el seguimiento de la clientela y cumplir las obligaciones legales (contabilidad).', 'Garantizar la seguridad y el buen funcionamiento del sitio.', 'Solo con tu consentimiento: elaborar estadísticas de visitas.'] },
      { h: 'Base del tratamiento', p: ['Los datos se tratan para preparar y prestar el servicio que solicitas, sobre la base de tu consentimiento cuando es necesario (datos sensibles, medición de audiencia), por un interés preponderante (seguridad del sitio) o por obligación legal.'] },
      { h: 'Destinatarios y encargados', p: ['Solo la esteticista tiene acceso a tus datos. Se alojan o transmiten a través de los siguientes proveedores, que actúan únicamente siguiendo instrucciones:'], ul: ['Google Firebase (Google Ireland Limited / Google LLC): registro de las solicitudes de cita y de la agenda, envío técnico de correos.', 'Google (Gmail): entrega de los correos de confirmación.', 'WhatsApp (Meta Platforms Ireland Limited): cuando decides enviar tu solicitud por WhatsApp, según las condiciones de ese servicio.', `${s.host.name}: alojamiento de las páginas del sitio.`, 'Google Analytics (Google Ireland Limited), solo si lo aceptas: estadísticas de visitas.'] },
      { h: 'Transferencias al extranjero', p: ['Estos proveedores pueden tratar datos fuera de Suiza, en particular en la Unión Europea y el Espacio Económico Europeo (nivel de protección reconocido como adecuado por Suiza) y en Estados Unidos. En este último caso, la transferencia se basa en el marco Suiza–EE. UU. de protección de datos (Swiss-U.S. Data Privacy Framework) cuando el proveedor está certificado o, en su defecto, en cláusulas contractuales tipo.'] },
      { h: 'Plazos de conservación', ul: ['Solicitudes y citas: 24 meses después de la última cita; después se eliminan.', 'Documentos contables: 10 años, conforme al derecho suizo.', 'Registros técnicos: según el plazo fijado por el proveedor de alojamiento.', 'Preferencia sobre cookies: 12 meses en tu dispositivo.'] },
      { h: 'Seguridad', p: ['El sitio solo se sirve mediante conexión cifrada (HTTPS). El acceso a la agenda está protegido por una cuenta personal; unas reglas de acceso estrictas impiden que un visitante consulte los datos de otra persona. Públicamente solo se ve la franja horaria reservada. En caso de violación de la seguridad de los datos que suponga un riesgo elevado, se informaría al Comisionado federal y a las personas afectadas conforme a la ley.'] },
      { id: 'cookies', h: 'Cookies y tecnologías similares', p: ['El sitio no utiliza cookies publicitarias ni rastreadores de redes sociales. En tu primera visita, un aviso te permite aceptar o rechazar los elementos opcionales; puedes cambiar tu elección en cualquier momento con el enlace «Gestionar cookies» al pie de página.'], ul: ['Necesarias (siempre activas): guardan tu elección sobre las cookies y permiten el funcionamiento de la reserva. Se almacenan en el almacenamiento local del navegador y no sirven para rastrearte.', 'Medición de audiencia (opcional, desactivada por defecto): Google Analytics, con dirección IP abreviada, para conocer las páginas más visitadas. Cookies «_ga», duración máxima de 13 meses. Solo se instalan tras tu aceptación y se eliminan si retiras tu consentimiento.'] },
      { h: 'Tus derechos', p: ['En cualquier momento y de forma gratuita puedes:'], ul: ['solicitar qué datos tuyos se tratan y obtener una copia (derecho de acceso y de entrega);', 'pedir la rectificación de datos inexactos;', 'solicitar la supresión de tus datos u oponerte a su tratamiento, dentro de los límites de las obligaciones legales de conservación;', 'retirar un consentimiento otorgado, sin efecto retroactivo.'] },
      { h: 'Cómo ejercer tus derechos', p: [`Envía tu solicitud a ${contact}. Recibirás respuesta en un plazo de 30 días. También puedes dirigirte al Comisionado federal de protección de datos y transparencia (PFPDT), Feldeggweg 1, 3003 Berna — www.edoeb.admin.ch.`] },
      { h: 'Menores', p: ['Las solicitudes de cita relativas a una persona menor de edad deben realizarlas su representante legal o hacerse con su consentimiento.'] },
      { h: 'Modificaciones', p: ['Esta política puede adaptarse si cambian el sitio o el marco legal. Prevalece la versión publicada en esta página; en caso de divergencia entre idiomas, la versión francesa.'] },
    ],
  },
  en: {
    kicker: 'Data protection',
    title: 'Privacy policy',
    updated: `Last updated: ${dates.en}`,
    sections: [
      { h: 'In brief', p: [`${s.name} collects only the data needed to arrange your appointments. It is never sold or used for advertising. No audience measurement tool is activated without your consent. This policy follows the Swiss Federal Act on Data Protection (FADP, as in force since 1 September 2023, known as the “nFADP”).`] },
      { h: 'Data controller', p: [`${s.legalName}, ${s.name}, Geneva (Switzerland).`, `For any question or request about your data: ${contact}.`] },
      { h: 'Data processed', p: ['Depending on how you use the website, the following data may be processed:'], ul: ['Appointment request: full name, phone number, email address (optional), address for the home treatment, treatments chosen, date and time, free-text message and website language used.', 'Direct communication: the content of messages you send by WhatsApp, email or phone.', 'Technical data: IP address, date and time and browser type, recorded in the hosting provider’s logs for security purposes.', 'Audience measurement, only with your consent: pages viewed, device and approximate origin, in statistical form.'] },
      { h: 'Sensitive data', p: ['Some information useful for a treatment (pregnancy, allergies, skin conditions, contraindications) may be sensitive health data. Share only what is necessary: by providing it, you expressly consent to its use to adapt the treatment. It is never passed on to third parties.'] },
      { h: 'Purposes', ul: ['To handle your request, confirm, change or cancel an appointment and contact you about it.', 'To show other visitors which time slots are already taken, without any data that identifies you.', 'To keep client records and meet legal obligations (accounting).', 'To keep the website secure and working properly.', 'Only with your consent: to compile visitor statistics.'] },
      { h: 'Basis for processing', p: ['Data is processed to prepare and provide the service you request, on the basis of your consent where required (sensitive data, audience measurement), an overriding interest (website security) or a legal obligation.'] },
      { h: 'Recipients and processors', p: ['Only the beautician has access to your data. It is stored or transmitted by the following providers, which act solely on instruction:'], ul: ['Google Firebase (Google Ireland Limited / Google LLC): storage of appointment requests and the diary, technical sending of emails.', 'Google (Gmail): delivery of confirmation emails.', 'WhatsApp (Meta Platforms Ireland Limited): when you choose to send your request by WhatsApp, under that service’s terms.', `${s.host.name}: hosting of the website pages.`, 'Google Analytics (Google Ireland Limited), only if you accept it: visitor statistics.'] },
      { h: 'Transfers abroad', p: ['These providers may process data outside Switzerland, in particular in the European Union and European Economic Area (recognised by Switzerland as providing adequate protection) and in the United States. In the latter case, the transfer relies on the Swiss-U.S. Data Privacy Framework where the provider is certified, or otherwise on standard contractual clauses.'] },
      { h: 'Retention periods', ul: ['Requests and appointments: 24 months after the last appointment, then deleted.', 'Accounting records: 10 years, in accordance with Swiss law.', 'Technical logs: for the period set by the hosting provider.', 'Cookie preference: 12 months on your device.'] },
      { h: 'Security', p: ['The website is served only over an encrypted connection (HTTPS). Access to the diary is protected by a personal account; strict access rules prevent any visitor from viewing another person’s data. Only the booked time slot is publicly visible. In the event of a data security breach posing a high risk, the Federal Commissioner and the persons concerned would be informed as required by law.'] },
      { id: 'cookies', h: 'Cookies and similar technologies', p: ['The website uses no advertising cookies and no social media trackers. On your first visit, a banner lets you accept or refuse optional items; you can change your choice at any time using the “Manage cookies” link at the bottom of the page.'], ul: ['Necessary (always active): remembering your cookie choice and making the booking work. They are kept in your browser’s local storage and are not used to track you.', 'Audience measurement (optional, off by default): Google Analytics, with shortened IP address, to see which pages are viewed most. “_ga” cookies, maximum lifetime 13 months. They are set only after you accept and deleted if you withdraw your consent.'] },
      { h: 'Your rights', p: ['At any time and free of charge you may:'], ul: ['ask which data about you is processed and obtain a copy (right of access and data portability);', 'have inaccurate data corrected;', 'ask for your data to be erased or object to its processing, within the limits of legal retention obligations;', 'withdraw consent you have given, without retroactive effect.'] },
      { h: 'Exercising your rights', p: [`Send your request to ${contact}. You will receive a reply within 30 days. You may also contact the Federal Data Protection and Information Commissioner (FDPIC), Feldeggweg 1, 3003 Bern — www.edoeb.admin.ch.`] },
      { h: 'Minors', p: ['Appointment requests concerning a minor must be made by their legal representative or with that person’s consent.'] },
      { h: 'Changes', p: ['This policy may be updated if the website or the legal framework changes. The version published on this page applies; if language versions differ, the French version prevails.'] },
    ],
  },
};

export const legal = { mentions: mentions[lang] || mentions.fr, privacy: privacy[lang] || privacy.fr };
