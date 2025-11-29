// app/api/payment/callback/route.ts

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const secretKey = process.env.MONEYFUSION_SECRET_KEY;

  if (!secretKey) {
    console.error("La clé secrète de MoneyFusion n'est pas définie.");
    return NextResponse.json({ status: 'error', message: 'Configuration serveur incorrecte.' }, { status: 500 });
  }

  try {
    const textBody = await req.text();
    const signature = req.headers.get('x-moneyfusion-signature');
    
    // Créer un hachage de la charge utile avec la clé secrète
    const hash = crypto.createHmac('sha256', secretKey).update(textBody).digest('hex');

    // Comparer le hachage calculé avec la signature de l'en-tête
    if (hash !== signature) {
      console.warn("Signature de callback invalide.");
      return NextResponse.json({ status: 'error', message: 'Signature invalide.' }, { status: 401 });
    }

    // La signature est valide, vous pouvez traiter les données
    const data = JSON.parse(textBody);
    
    console.log('Callback MoneyFusion reçu et validé :', data);

    const { status, reference, metadata } = data;
    const orderId = metadata?.order_id;
    
    if (status === 'success') {
      // TODO:
      // 1. Recherchez la commande dans votre base de données en utilisant `orderId`.
      // 2. Vérifiez que la commande n'a pas déjà été traitée.
      // 3. Mettez à jour le statut de la commande à "payée".
      // 4. Déclenchez toute autre logique métier (ex: envoyer un email de confirmation, accorder l'accès, etc.).
      
      console.log(`Paiement réussi pour la commande ${orderId}. Référence: ${reference}`);

    } else {
      // Le paiement a échoué ou a été annulé
      console.log(`Statut du paiement pour la commande ${orderId}: ${status}`);
    }

    // Répondre à MoneyFusion pour accuser réception
    return NextResponse.json({ status: 'success' });

  } catch (error) {
    console.error("Erreur lors du traitement du callback MoneyFusion:", error);
    return NextResponse.json({ status: 'error', message: 'Erreur interne du serveur.' }, { status: 500 });
  }
}
