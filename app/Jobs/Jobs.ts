import MatchingJob from './MatchingJob'
import cron from 'node-cron'

class Jobs {
  private matchingJobInterval = '* * 6 * * *'

  public async execute() {
    // execute job on boot as well
    MatchingJob.execute()

    cron.schedule(this.matchingJobInterval, () => {
      MatchingJob.execute()
    })
  }
}

export default new Jobs()
