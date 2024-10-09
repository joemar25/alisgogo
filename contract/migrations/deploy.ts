import * as anchor from "@coral-xyz/anchor"; // Proper import for anchor
import { Provider } from "@coral-xyz/anchor";

module.exports = async function (provider: Provider) {
  // Configure client to use the provider.
  anchor.setProvider(provider);

  // Add your deploy script here.
};
