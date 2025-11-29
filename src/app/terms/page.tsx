import { FileText } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <FileText className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Conditions de Service
        </h1>
        <p className="mt-4 text-muted-foreground">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>
      </div>

      <div className="space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 font-headline">1. Introduction</h2>
          <p>
            Bienvenue sur RicStreaming. En accédant à notre site web et en utilisant nos services, vous acceptez d'être lié par les présentes Conditions de Service. Veuillez les lire attentivement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 font-headline">2. Description du Service</h2>
          <p>
            RicStreaming fournit un pack d'accès unique ("le Pack") qui inclut une application (APK) pour le streaming d'événements sportifs, un guide d'installation, et une assistance personnalisée. L'accès est fourni "à vie", ce qui signifie pour la durée de vie du service RicStreaming.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 font-headline">3. Achat et Paiement</h2>
          <p>
            L'achat du Pack est un paiement unique. Les prix sont indiqués en Francs CFA (FCFA). Nous utilisons des processeurs de paiement tiers (par exemple, MoneyFusion) pour toutes les transactions. Nous ne stockons pas vos informations de carte de crédit.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 font-headline">4. Livraison du Produit</h2>
          <p>
            Après confirmation du paiement, vous recevrez un e-mail à l'adresse fournie contenant un lien de téléchargement pour l'APK, le guide d'installation, et les informations de contact pour l'assistance. Il est de votre responsabilité de fournir une adresse e-mail valide.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 font-headline">5. Obligations de l'Utilisateur</h2>
          <p>
            Vous vous engagez à utiliser le service uniquement à des fins personnelles et non commerciales. Vous ne devez pas redistribuer, revendre ou partager l'application APK ou vos accès. Vous êtes responsable de la sécurité de votre appareil et de l'installation de l'application.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 font-headline">6. Politique de Remboursement</h2>
          <p>
            Nous offrons une garantie de remboursement de 7 jours. Si vous n'êtes pas satisfait, vous pouvez demander un remboursement complet dans les 7 jours suivant votre achat.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 font-headline">7. Limitation de Responsabilité</h2>
          <p>
            RicStreaming fournit un accès à des flux de streaming. Nous ne sommes pas responsables de la qualité, de la disponibilité ou de la légalité des flux eux-mêmes. Le service est fourni "tel quel", sans garantie d'aucune sorte.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 font-headline">8. Modifications des Conditions</h2>
          <p>
            Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications seront effectives dès leur publication sur cette page.
          </p>
        </section>
      </div>
    </div>
  );
}
