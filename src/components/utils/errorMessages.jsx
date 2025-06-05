// utils/errorMessages.js

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
export const FALLBACK_STATE_DEFAULT = "Résultats limités (mode offline).";

/**
 * Message par défaut en cas d’erreur “classique” (non-fallback)
 */
export const SEARCH_UNKNOWN_ERROR = "Erreur inconnue lors de la recherche.";
