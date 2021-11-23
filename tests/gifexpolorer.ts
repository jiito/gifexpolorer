import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Gifexpolorer } from '../target/types/gifexpolorer';
const { SystemProgram} = anchor.web3;
describe('sol_gif_project', () => {

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Gifexpolorer as Program<Gifexpolorer>;

  const baseAccount = anchor.web3.Keypair.generate();

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount], 
    });
    console.log("Your transaction signature", tx);

    let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('GIF Count ', account.totalGifs.toString());
  });

  it('Sending GIF', async () => {
    await program.rpc.addGif("https://media.giphy.com/media/26tOZbfDjoZc4I5KE/giphy.gif", {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey
      }
    })
    let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('GIF Count (after send) ', account.totalGifs.toString());

    // Access gif_list on the account!
    console.log('👀 GIF List', account.gifList)

  })
});
 