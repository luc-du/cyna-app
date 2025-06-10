/**
 * Message utilisé lorsqu’on ne parvient pas à joindre l’API
 * et qu’on bascule en mode local (fallback).
 */
export const FALLBACK_API_MESSAGE =
  "Service indisponible, résultats limités en local.";

/**
 * Préfixe pour afficher l’avertissement côté state lorsque
 * le fallback a renvoyé un message personnalisé.
 * Exemple d’utilisation : `${FALLBACK_STATE_PREFIX}${apiMsg}`
 */
export const FALLBACK_STATE_PREFIX = "Attention : ";

/**
 * Message par défaut à afficher dans le state si on est en fallback
 * mais que l’API n’a pas renvoyé de message explicite.
 */
export const FALLBACK_STATE_DEFAULT =
  "Résultats limités - B.D.D vide ou hors connexion (mode offline).";

/**
 * Message par défaut en cas d’erreur “classique” (non-fallback)
 */
export const SEARCH_UNKNOWN_ERROR = "Erreur inconnue lors de la recherche.";

/* TOKEN */
export const TOKEN_EXPIRED_ERROR = "Le token a expiré.";
export const TOKEN_INVALID_ERROR = "Le token est invalide.";

/* AUTH */
export const AUTH_INVALID_CREDENTIALS_ERROR =
  "Identifiants invalides. Veuillez réessayer.";
export const AUTH_LOGIN_ERROR = "Erreur lors de la connexion.";
export const AUTH_SIGNUP_ERROR = "Erreur lors de l'inscription.";
export const AUTH_FORGOT_PASSWORD_ERROR =
  "Erreur lors de la demande de réinitialisation.";
export const AUTH_PASSWORD_RESET_ERROR =
  "Erreur lors de la réinitialisation du mot de passe.";

// ---REGISTER
export const REGISTER_ERROR = "Erreur d'inscription :";

/* EMAILS */
export const AUTH_EMAIL_ALREADY_EXISTS_ERROR =
  "Impossible de créer le compte. Veuillez vérifier vos informations.";
export const AUTH_ACCOUNT_NOT_VERIFIED_ERROR =
  "Connexion impossible. Vérifiez vos informations ou votre email.";
export const AUTH_EMAIL_VERIFICATION_FAILED =
  "Échec lors de la vérification de l'email. Veuillez réessayer.";

/*  */
export const AUTH_ACCOUNT_VALIDATION_ERROR =
  "Erreur lors de la validation du compte.";
export const AUTH_PROFILE_UPDATE_ERROR =
  "Erreur lors de la mise à jour du profil.";
export const AUTH_PROFILE_UPLOAD_ERROR =
  "Erreur lors de l’envoi de l’image de profil.";
export const AUTH_PASSWORD_UPDATE_ERROR =
  "Erreur lors de la mise à jour du mot de passe.";
export const AUTH_ACCOUNT_DELETION_ERROR =
  "Erreur lors de la suppression du compte.";
export const AUTH_UNAUTHORIZED_ERROR = "Accès non autorisé.";
export const AUTH_USER_NOT_FOUND_ERROR =
  "Identifiants invalides ou utilisateur inexistant.";

/* USER */
export const AVATAR_UPLOAD_ERROR = "Erreur lors de la mise à jour de l'avatar";

/* ADDRESSES */
export const ADDRESS_CREATE_ERROR =
  "Erreur lors de la création de l'adresse. Veuillez réessayer.";
export const ADDRESSES_GET_ERROR =
  "Erreur lors de la création des adresses de l'utilisateur. Veuillez réessayer.";
export const ADDRESS_UPDATE_ERROR =
  "Erreur lors de la mise à jour de l'adresse. Modifications non enregistrées.";
export const ADDRESS_DELETE_ERROR =
  "Erreur lors de la suppression de l'adresse. Veuillez réessayer plus tard.";

/* PASSWORD */
export const PASSWORD_INPUTTED_ERROR =
  "Le mot de passe doit contenir au moins 6 caractères, une majuscule, un chiffre et un caractère spécial";
