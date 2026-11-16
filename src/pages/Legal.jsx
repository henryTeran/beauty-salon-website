import { legal } from '../content/legal.js';
import { getRouteMeta } from '../seo/routes.js';
import { PageHero } from '../components/blocks.jsx';
import { Reveal } from '../components/ui.jsx';

/** Page de texte juridique : sommaire à gauche, sections numérotées à droite */
function LegalPage({ path, doc }) {
  const meta = getRouteMeta(path);
  const anchor = (sec, i) => sec.id || `s${i + 1}`;
  return (
    <>
      <PageHero kicker={doc.kicker} title={doc.title} breadcrumbs={meta.breadcrumbs}>
        <p className="text-base">{doc.updated}</p>
      </PageHero>
      <section className="section !pt-14">
        <div className="container-site grid gap-12 lg:grid-cols-[17rem_1fr]">
          <nav aria-label={doc.title} className="hidden lg:block">
            <ol className="sticky top-28 space-y-2 border-l border-gold/30 pl-5 text-[0.9rem] text-taupe">
              {doc.sections.map((sec, i) => (
                <li key={sec.h}>
                  <a href={`#${anchor(sec, i)}`} className="link-line hover:text-bordeaux">{sec.h}</a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="max-w-3xl space-y-12">
            {doc.sections.map((sec, i) => (
              <Reveal as="section" key={sec.h} id={anchor(sec, i)} y={16} className="scroll-mt-28">
                <h2 className="flex items-baseline gap-4 font-serif text-[1.7rem] leading-tight text-bordeaux md:text-3xl">
                  <span className="font-serif text-lg italic text-gold-dark">{String(i + 1).padStart(2, '0')}</span>
                  {sec.h}
                </h2>
                {sec.p?.map((p) => (
                  <p key={p} className="mt-4 text-taupe">{p}</p>
                ))}
                {sec.ul && (
                  <ul className="mt-4 space-y-2.5 text-taupe">
                    {sec.ul.map((li) => (
                      <li key={li} className="flex gap-3">
                        <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export const MentionsLegales = () => <LegalPage path="/mentions-legales" doc={legal.mentions} />;
export const Confidentialite = () => <LegalPage path="/confidentialite" doc={legal.privacy} />;
