import MatchingJob from './MatchingJob'
import cron from 'node-cron'

class Jobs {
  private matchingJobInterval = '* * 6 * * *'

  public async execute() {
    cron.schedule(this.matchingJobInterval, () => {
      MatchingJob.execute()
    })
  }
}

export default new Jobs()
