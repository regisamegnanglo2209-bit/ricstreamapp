import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <ShieldCheck className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Politique de Confidentialité
        </h1>
        <p className="mt-4 text-muted-foreground">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>
      </div>

      <div className="space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 font-headline">1. Collecte des Informations</h2>
          <p>
            Nous collectons les informations que vous nous fournissez directement lors de l'achat de notre Pack. Cela inclut :
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Votre nom complet</li>
              <li>Votre adresse e-mail (Gmail)</li>
              <li>Votre numéro de téléphone</li>
            </ul>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 font-headline">2. Utilisation des Informations</h2>
          <p>
            Les informations que nous collectons sont utilisées exclusivement pour les finalités suivantes :
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Pour traiter votre commande et votre paiement.</li>
              <li>Pour vous envoyer l'e-mail de confirmation contenant l'APK, le guide et les informations de support.</li>
              <li>Pour vous fournir une assistance personnalisée lorsque vous nous contactez.</li>
              <li>Pour vous informer des mises à jour importantes concernant le service.</li>
            </ul>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 font-headline">3. Partage des Informations</h2>
          <p>
            Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles identifiables à des tiers. Cela n'inclut pas les tiers de confiance qui nous aident à exploiter notre site web ou à servir nos utilisateurs (comme les processeurs de paiement), tant que ces parties conviennent de garder ces informations confidentielles.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 font-headline">4. Sécurité des Données</h2>
          <p>
            Nous mettons en œuvre une variété de mesures de sécurité pour maintenir la sécurité de vos informations personnelles. Les transactions de paiement sont cryptées via la technologie Secure Socket Layer (SSL).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 font-headline">5. Cookies</h2>
          <p>
            Notre site peut utiliser des cookies pour améliorer l'expérience utilisateur. Les cookies sont de petits fichiers qu'un site ou son fournisseur de services transfère sur le disque dur de votre ordinateur par le biais de votre navigateur Web (si vous l'autorisez).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 font-headline">6. Consentement</h2>
          <p>
            En utilisant notre site, vous consentez à notre politique de confidentialité.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 font-headline">7. Contact</h2>
          <p>
            Si vous avez des questions concernant cette politique de confidentialité, vous pouvez nous contacter via notre page de contact.
          </p>
        </section>
      </div>
    </div>
  );
}
