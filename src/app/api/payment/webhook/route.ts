import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Affiche les données du webhook dans les logs du serveur pour le débogage
    console.log('Webhook MoneyFusion reçu :', body);

    const { event, tokenPay, statut, personal_Info } = body;

    // TODO: Implémentez votre logique de traitement ici.
    // - Vérifiez la base de données pour voir si la commande (avec tokenPay) existe.
    // - Mettez à jour le statut de la commande en fonction de l'événement (par exemple, 'completed' ou 'cancelled').
    // - Si le paiement est réussi ('payin.session.completed'), accordez l'accès au produit/service.
    // - Ignorez les événements redondants si le statut a déjà été mis à jour.
    
    // Exemple de logique :
    if (event === 'payin.session.completed') {
        console.log(`Commande ${tokenPay} payée avec succès.`);
        // Logique pour donner l'accès à l'utilisateur...
    } else if (event === 'payin.session.cancelled') {
        console.log(`Le paiement pour la commande ${tokenPay} a échoué ou a été annulé.`);
    } else {
        console.log(`Événement reçu pour la commande ${tokenPay}: ${event}`);
    }


    // Répondez à MoneyFusion avec un statut 200 pour indiquer que vous avez bien reçu la notification.
    return NextResponse.json({ status: 'success', message: 'Webhook reçu' });
    
  } catch (error: any) {
    console.error('Erreur lors du traitement du webhook MoneyFusion :', error);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
